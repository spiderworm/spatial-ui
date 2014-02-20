
define(
	[
		'./DataWriter',
		'./DataReader'
	],
	function define_module(DataWriter, DataReader)
	{
		var log = function () {};
		//log = console.log.bind(console, "| OSCMessage | ");

		function string_size(s)
		{
			var len = s.toString().length + 1;
			var mod = len % 4;

			return mod?(len + (4 - mod)):len;
		}

		function constant_size(c)
		{ return function get_const_size() { return c; }; }

		function blob_size(b)
		{
			var len = b.byteLength + 4;
			var mod = len % 4;

			return mod?(len + (4 - mod)):len;
		}

		function serializeInt32(v, w)
		{ w.writeInt32(v); }
		function deserializeInt32(r)
		{ return r.readInt32(); }
		function serializeInt64(v, w)
		{ throw new Error('Int64 not supported in JavaScript'); }
		function deserializeInt64(r)
		{ throw new Error('Int64 not supported in JavaScript'); }

		function serializeFloat32(v, w)
		{ w.writeFloat32(v); }
		function deserializeFloat32(r)
		{ return r.readFloat32(); }
		function serializeFloat64(v, w)
		{ w.writeFloat64(v); }
		function deserializeFloat64(r)
		{ return r.readFloat64(); }

		function serializeString(v, w)
		{ w.writeString(v); }
		function deserializeString(r)
		{ return r.readString(); }

		function serializeTimeCode(t, w)
		{
			if (t == null || t == 0)
			{
				w.writeUint32(0);
				w.writeUint32(1);
			}
			else
			{
				var time = t/1000;
				var seconds = Math.floor(time);
				var fraction = Math.floor((time - seconds) * 0xffffffff);
				log("timestamp serialized: " + seconds + " " + fraction + " <= " + t);
				w.writeUint32(seconds);
				w.writeUint32(fraction);
			}
		}

		function deserializeTimeCode(r)
		{
			var seconds = r.readUint32();
			var fraction = r.readUint32();

			if (seconds === 0 && fraction === 1)
			{
				return 0;
			}
			else
			{
				var t = Math.floor((seconds + (fraction / 0xffffffff)) * 1000);
				log("timestamp deserialized: " + seconds + " " + fraction + " " + t);
				return t;
			}
		}

		function serializeBlob(v, w)
		{
			if (v instanceof ArrayBuffer)
			{
				w.writeInt32(v.byteLength);
				w.writeChunk(v);
			}
			else
				{ throw new Error("Can only serialize ArrayBuffer."); }
		}
		function deserializeBlob(r)
		{
			var len = r.readInt32();
			return r.readChunk(len);
		}

		function serializeNil(v, w) {}
		function deserializeNil(r) { return null; }
		function deserializeTrue(r) { return true; }
		function deserializeFalse(r) { return false; }
		function deserializeInfinitum(r) { return Infinity; }

		function OSCType(code, serialize_fn, deserialize_fn)
		{
			this.code = code;
			this.serialize = serialize_fn;
			this.deserialize = deserialize_fn;
		}

		function OSCMessage(address, timestamp)
		{
			this.routingState = OSCMessage.STATE_UNHANDLED;
			this._parameters = [];

			if (typeof(address) === 'string')
				{ this.address = address; }
			else if (address instanceof Array)
			{
				log("Creating bundle of " + address.length + " messages: ", address);
				this.address = "#bundle";
				this.timestamp = timestamp;
				this.bundle = address.slice();
			}
			else if (typeof(address.byteLength) !== 'undefined')
				{ this.deserialize(address); }
		}

		function addParameter(type, value)
		{
			this._parameters.push({ t: type, v: value });
			return this;
		}

		OSCMessage.STATE_UNHANDLED = 0;
		OSCMessage.STATE_HANDLED = 1;
		OSCMessage.STATE_IGNORED = 2;
		OSCMessage.STATE_STOPPED = 3;
		OSCMessage.STATE_REPLACED = 4;

		OSCMessage._types = [
			OSCMessage.TYPE_INT32     = new OSCType('i'.charCodeAt(0), serializeInt32,   deserializeInt32),
			OSCMessage.TYPE_FLOAT32   = new OSCType('f'.charCodeAt(0), serializeFloat32, deserializeFloat32),
			OSCMessage.TYPE_STRING    = new OSCType('s'.charCodeAt(0), serializeString,  deserializeString),
			OSCMessage.TYPE_BLOB      = new OSCType('b'.charCodeAt(0), serializeBlob,    deserializeBlob),
			OSCMessage.TYPE_INT64     = new OSCType('h'.charCodeAt(0), serializeInt64,   deserializeInt64),
			OSCMessage.TYPE_TIME      = new OSCType('t'.charCodeAt(0), serializeTimeCode,deserializeTimeCode),
			OSCMessage.TYPE_FLOAT64   = new OSCType('d'.charCodeAt(0), serializeFloat64, deserializeFloat64),
			OSCMessage.TYPE_SYMBOL    = new OSCType('S'.charCodeAt(0), serializeString,  deserializeString),
			OSCMessage.TYPE_CHAR      = new OSCType('c'.charCodeAt(0), serializeInt32,   deserializeInt32),
			OSCMessage.TYPE_COLOR     = new OSCType('r'.charCodeAt(0), serializeInt32,   deserializeInt32),
			OSCMessage.TYPE_MIDI      = new OSCType('m'.charCodeAt(0)),
			OSCMessage.TYPE_TRUE      = new OSCType('T'.charCodeAt(0), serializeNil,     deserializeTrue),
			OSCMessage.TYPE_FALSE     = new OSCType('F'.charCodeAt(0), serializeNil,     deserializeFalse),
			OSCMessage.TYPE_NIL       = new OSCType('N'.charCodeAt(0), serializeNil,     deserializeNil),
			OSCMessage.TYPE_INFINITUM = new OSCType('I'.charCodeAt(0), serializeNil,     deserializeInfinitum)
		];

		OSCMessage.typeForChar = function typeForChar(c)
		{
			c = c.charCodeAt(0);
			for (var t = 0; t < OSCMessage._types.length; ++t)
			{
				if (OSCMessage._types[t].code === c)
					{ return OSCMessage._types[t]; }
			}
			debugger;
			return null;
		}

		OSCMessage.prototype.addParameter = addParameter;

		OSCMessage.prototype.getParameterCount = function getParameterCount()
		{ return this._parameters.length; }

		OSCMessage.prototype.getParameterType = function getParameterType(index)
		{
			if (index >= 0 && index < this._parameters.length)
				{ return this._parameters[index].t }
		}

		OSCMessage.prototype.getParameterValue = function getParameterValue(index)
		{
			if (index >= 0 && index < this._parameters.length)
				{ return this._parameters[index].v }
		}

		// official type tags
		OSCMessage.prototype.addInt32     = function (v) { return this.addParameter(OSCMessage.TYPE_INT32, v); }
		OSCMessage.prototype.addFloat32   = function (v) { return this.addParameter(OSCMessage.TYPE_FLOAT32, v); }
		OSCMessage.prototype.addString    = function (v) { return this.addParameter(OSCMessage.TYPE_STRING, v); }
		OSCMessage.prototype.addBlob      = function (v) { return this.addParameter(OSCMessage.TYPE_BLOB, v); }

		// unofficial type tags
		OSCMessage.prototype.addInt64     = function (v) { return this.addParameter(OSCMessage.TYPE_INT64, v); }
		OSCMessage.prototype.addTimeTag   = function (v) { return this.addParameter(OSCMessage.TYPE_TIME, v); }
		OSCMessage.prototype.addFloat64   = function (v) { return this.addParameter(OSCMessage.TYPE_FLOAT64, v); }
		OSCMessage.prototype.addSymbol    = function (v) { return this.addParameter(OSCMessage.TYPE_SYMBOL, v); }
		OSCMessage.prototype.addChar      = function (v) { return this.addParameter(OSCMessage.TYPE_CHAR, v); }
		OSCMessage.prototype.addColor     = function (v) { return this.addParameter(OSCMessage.TYPE_COLOR, v); }
		OSCMessage.prototype.addMidi      = function (v) { return this.addParameter(OSCMessage.TYPE_MIDI, v); }
		OSCMessage.prototype.addTrue      = function (v) { return this.addParameter(OSCMessage.TYPE_TRUE, v); }
		OSCMessage.prototype.addFalse     = function (v) { return this.addParameter(OSCMessage.TYPE_FALSE, v); }
		OSCMessage.prototype.addNil       = function (v) { return this.addParameter(OSCMessage.TYPE_NIL, v); }
		OSCMessage.prototype.addInfinitum = function (v) { return this.addParameter(OSCMessage.TYPE_INFINITUM, v); }

		OSCMessage.prototype._typeTag = function typeTag()
		{
			var typeTag = ",";

			for (var p = 0; p < this._parameters.length; ++p)
			{
				var type = this._parameters[p].t;
				if (type == null)
					{ debugger; }
				typeTag += String.fromCharCode(type.code);
			}

			return typeTag;
		}

		OSCMessage.prototype.serialize = function serialize(prependSize)
		{
			var typeTag = this._typeTag();
			var writer = new DataWriter(4);

			serializeString(this.address, writer);
			if (this.address === "#bundle")
			{
				serializeTimeCode(this.timestamp, writer);

				//log("serializing bundle with " + this.bundle.length + " messages.");
				for (var s = 0; s < this.bundle.length; ++s)
				{
					writer.writeChunk(this.bundle[s].serialize(true));
				}
			}
			else
			{
				serializeString(typeTag, writer);

				// parameter values
				for (var p = 0; p < this._parameters.length; ++p)
				{
					var type = this._parameters[p].t;
					var value = this._parameters[p].v;

					if (typeof(type.serialize) !== 'function')
						{ throw new Error("Unsupported OSC Type."); }

					type.serialize(value, writer);
				}
			}

			return writer.serialize(prependSize);
		}

		OSCMessage.prototype.deserialize = function deserialize(buffer)
		{
			log("deserialize:", buffer);

			if (!(buffer instanceof ArrayBuffer))
				{ buffer = buffer.buffer; }

			var reader = new DataReader(buffer, 4);

			this.address = reader.readString();
			log("address: " + this.address);

			if (this.address === "#bundle")
			{
				log("deserializing bundle");

				this.timestamp = deserializeTimeCode(reader);

				this.bundle = [];
				while (reader.rest > 0)
				{
					var len = reader.readUint32();
					log(len + " byte message");
					if (reader.rest >= len)
					{
						var sub = reader.readChunk(len);
						this.bundle.push(new OSCMessage(sub));
					}
				}
			}
			else
			{
				var typeTag = reader.readString();
				log("types: " + typeTag);

				if (typeTag.charAt() === ',')
				{
					for (var i = 1; i < typeTag.length; ++i)
					{
						var type = typeTag.charCodeAt(i);
						for (var t = 0; t < OSCMessage._types.length; ++t)
						{
							var typeObj = OSCMessage._types[t];
							if (typeObj.code == type)
							{
								if (typeObj.deserialize)
									{ this.addParameter(typeObj, typeObj.deserialize(reader)); }
								else
									{ throw new Error("Unsupported type in buffer"); }
								break;
							}
						}
					}
				}
				else
					{ throw new Error("Bad OSC type tag string: " + typeTag); }
			}
		}

		OSCMessage.prototype.toString = function toString()
		{
			if (this.address === "#bundle")
			{
				var str = "BUNDLE [\n";
				for (var i = 0; i < this.bundle.length; ++i)
				{
					str += "    " + this.bundle[i].toString() + "\n";
				}
				str += "]";
				if (this.timestamp)
					{ str += " @ " + this.timestamp; }
			}
			else
			{
				var str = this.address + this._typeTag();
				//log("MSG.toString(): ", str);

				for (var i = 0; i < this._parameters.length; ++i)
				{
					//log("  p1: " + String.fromCharCode(this._parameters[i].t.code) + ", " +
					//	this._parameters[i].v.toString());

					if (this._parameters[i].t.serialize != serializeNil)
						{ str += " " + this._parameters[i].v.toString(); }
				}
			}
			return str;
		}

		return OSCMessage;
	}
);


