var React = require('React');
var RangeSlider = require('../range.jsx');
var CodeBlock = require('../codeblock.jsx');
var BlendModes = require('../blendmode.jsx');
var Background = require('../background.jsx');
var ReactTabs = require('react-tabs');
var Tab = ReactTabs.Tab;
var Tabs = ReactTabs.Tabs;
var TabList = ReactTabs.TabList;
var TabPanel = ReactTabs.TabPanel;

var Sidebar = React.createClass({

    render: function () {

      return (
        <aside className="sidebar">
          <Tabs className="tabs" onSelect={this.handleSelected} selectedIndex={0} >
           <TabList className="tabs__headers">
             <Tab className="tabs__item">
               <p className="tabs__label">Generator</p>
             </Tab>
             <Tab className="tabs__item">
               <p className="tabs__label">CSS Code</p>
             </Tab>
           </TabList>
            <TabPanel className="tabs__content">

              <p className="tabs__subheader">Filters</p>
              <RangeSlider ref="contrast" label="Contrast" value={this.props.filter.contrast} min="0" max="200" unit="%" handeUpdate={this.props.handeUpdate}/>
              <RangeSlider ref="brightness" label="Brightness" value={this.props.filter.brightness} min="0" max="200" unit="%" handeUpdate={this.props.handeUpdate}/>
              <RangeSlider ref="saturate" label="Saturate" value={this.props.filter.saturate} min="0" max="200" unit="%" handeUpdate={this.props.handeUpdate}/>
              <RangeSlider ref="sepia" label="Sepia" value={this.props.filter.sepia} min="0" max="100" unit="%" handeUpdate={this.props.handeUpdate}/>
              <RangeSlider ref="grayscale" label="Grayscale" value={this.props.filter.grayscale} min="0" max="100" unit="%" handeUpdate={this.props.handeUpdate}/>
              <RangeSlider ref="invert" label="Invert" value={this.props.filter.invert} min="0" max="100" unit="%" handeUpdate={this.props.handeUpdate}/>
              <RangeSlider ref="hueRotate" label="Hue Rotate" value={this.props.filter.hueRotate} min="0" max="360" unit="deg" handeUpdate={this.props.handeUpdate}/>
              <RangeSlider ref="blur" label="Blur" value={this.props.filter.blur} min="0" max="10" unit="px" handeUpdate={this.props.handeUpdate}/>

              <p className="tabs__subheader">Overlay</p>

              <Background
                ref="background"
                overlay={this.props.overlay}
                updateColor1={this.props.updateColor1}
                updateColor1Stop={this.props.updateColor1Stop}
                updateColor2={this.props.updateColor2}
                updateColor2Stop={this.props.updateColor2Stop}
                updateOverlayColor={this.props.updateOverlayColor}
                updateOverlayType={this.props.updateOverlayType}
                updateGradientPositions={this.props.updateGradientPositions}
              />
              <BlendModes ref="blend" blend={this.props.filter.blend} handeUpdate={this.props.handeUpdate} />
              <RangeSlider ref="opacity" label="Opacity" value={this.props.filter.opacity} min="0" max="100" unit="%" handeUpdate={this.props.handeUpdate}/>


            </TabPanel>
            <TabPanel className="tabs__content">
              <CodeBlock filter={this.props.filter} overlay={this.props.overlay}/>
            </TabPanel>
          </Tabs>
        </aside>
        );
      }
});

module.exports = Sidebar;
