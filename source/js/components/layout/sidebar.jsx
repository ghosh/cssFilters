var React = require('react');
var $ = require('jquery');
var nanoScroller = require('nanoScroller');
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

  getInitialState: function() {
    return {
      selectedIndex: 0
    }
  },

  handleSelected: function (index, last) {
    this.setState({
      selectedIndex: index
    });
  },

  componentDidMount: function() {
    $('.nano').nanoScroller();
    $('.mark-scroll').nanoScroller();
  },

  render: function () {

    return (
      <aside className="sidebar nano">
        <div className="nano-content">
          <Tabs className="tabs" onSelect={this.handleSelected} selectedIndex={this.state.selectedIndex} >
           <TabList className="tabs__headers">
             <Tab className="tabs__item">
               <p className="tabs__label">Generator</p>
             </Tab>
             <Tab className="tabs__item">
               <p className="tabs__label">CSS Code</p>
             </Tab>
           </TabList>
            <TabPanel className="tabs__content">

              <div className="tabs__heading">
                <p className="tabs__subheader">Filters</p>
                <span className="tabs__clear" onClick={this.props.resetState}>Clear All</span>
              </div>
              <RangeSlider ref="contrast" label="Contrast" value={this.props.filter.contrast} min="0" max="200" unit="%" handeUpdate={this.props.handeUpdate}/>
              <RangeSlider ref="brightness" label="Brightness" value={this.props.filter.brightness} min="0" max="200" unit="%" handeUpdate={this.props.handeUpdate}/>
              <RangeSlider ref="saturate" label="Saturate" value={this.props.filter.saturate} min="0" max="200" unit="%" handeUpdate={this.props.handeUpdate}/>
              <RangeSlider ref="sepia" label="Sepia" value={this.props.filter.sepia} min="0" max="100" unit="%" handeUpdate={this.props.handeUpdate}/>
              <RangeSlider ref="grayscale" label="Grayscale" value={this.props.filter.grayscale} min="0" max="100" unit="%" handeUpdate={this.props.handeUpdate}/>
              <RangeSlider ref="invert" label="Invert" value={this.props.filter.invert} min="0" max="100" unit="%" handeUpdate={this.props.handeUpdate}/>
              <RangeSlider ref="hueRotate" label="Hue Rotate" value={this.props.filter.hueRotate} min="0" max="360" unit="deg" handeUpdate={this.props.handeUpdate}/>
              <RangeSlider ref="blur" label="Blur" value={this.props.filter.blur} min="0" max="10" unit="px" handeUpdate={this.props.handeUpdate}/>


              <div className="tabs__heading">
                <p className="tabs__subheader">Overlay</p>
              </div>

              <Background
                ref="background"
                handeUpdate={this.props.handeUpdate}
                filter={this.props.filter}
                overlay={this.props.overlay}
                updateOverlay={this.props.updateOverlay}
                updateColor1={this.props.updateColor1}
                updateColor1Stop={this.props.updateColor1Stop}
                updateColor2={this.props.updateColor2}
                updateColor2Stop={this.props.updateColor2Stop}
                updateOverlayColor={this.props.updateOverlayColor}
                updateOverlayType={this.props.updateOverlayType}
                updateGradientPositions={this.props.updateGradientPositions}
              />



            </TabPanel>
            <TabPanel className="tabs__content">

              <div className="tabs__heading">
                  <p className="tabs__subheader">CSS</p>
              </div>
              <CodeBlock filter={this.props.filter} overlay={this.props.overlay}/>

              <div className="tabs__heading">
                  <p className="tabs__subheader">Markup</p>
              </div>
              <pre className="mark-scroll">
                <div className="nano-content mark__scroll-cont">
                <code>
              &lt;figure class="filter"&gt;<br />
              &nbsp;&nbsp;&lt;img src="..."&gt;<br />
              &lt;/figure&gt;
                </code>
              </div>
              </pre>
            </TabPanel>
          </Tabs>
        </div>
      </aside>
      );
    }
});

module.exports = Sidebar;
