<h1>Spatial UI</h1>

<p>
	Spatial UI is a game client for the <a href="https://github.com/glikker/starsim">starsim</a> service.  The service and the client work together to simulate a starship bridge experience.
</p>

<p><a href="http://spiderworm.github.io/spatial-ui/">demo</a></p>

<h2>Current State</h2>

<p>
	Spatial is not yet ready for any real use.  No date for any release has yet been scheduled.  Currently, <a href="https://github.com/glikker">glikker</a> and I are ironing out details of the client-server communication.
</p>

<h2>Roadmap</h2>

<ul>
	<li>
		<h3>0.1</h3>
		<ul>
			<li>
				Model-driven UI, and service-driven model.
			</li>
			<li>
				Service-driven model can be rolled back when out-of-order packets are received.
			</li>
			<li>
				JavaScript API for accessing/modifying the UI when it is embedded in game clients.
			</li>
			<li>
				Support for positioning and layout of several UI pieces and controls.
			</li>
			<li>
				Support for external camera visualization with models and textures delivered by the service.
			</li>
		</ul>
	</li>
	<li>
		<h3>0.2</h3>
		<ul>
			<li>
				Edit mode support for controls, panels, and screens.
			</li>
			<li>
				Support for additional control positioning schemas, including horizontal left/center/right positioning and vertical top/center/bottom positioning.
			</li>
		</ul>
	</li>
	<li>
		<h3>0.3</h3>
		<ul>
			<li>
				Support for label-less controls.
			</li>
			<li>
				Support for setting unique UI piece classifications that can be used to style pieces uniquely.
			</li>
			<li>
				Support for service-driven stylesheets.
			</li>
		</ul>
	</li>
	<li>
		<h3>0.4</h3>
		<ul>
			<li>
				New controls:
				<ul>
					<li>
						Knobs
					</li>
					<li>
						Circle slider
					</li>
					<li>
						Status lights
					</li>
					<li>
						Gauges
					</li>
					<li>
						Level indicators
					</li>
				</ul>
			</li>
		</ul>
	</li>
	<li>
		<h3>0.5</h3>
		<ul>
			<li>
				Support for 3D object inspection visualization.
			</li>
			<li>
				Support for particles in visualizations.
			</li>
			<li>
				Support for multiple texture and texture types in visualizations.
			</li>
		</ul>
	</li>
</ul>

<h2>Documentation</h2>

<p>Documentation is currently being assembled in the <a href="https://github.com/spiderworm/spatial-ui/wiki">wiki</a>.</p>