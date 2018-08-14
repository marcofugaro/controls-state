var preact = require('preact');
var createClass = require('preact-classless-component');

module.exports = createGui;

function createGui (state) {
  var h = preact.h;
  var render = preact.render;
  var Component = preact.Component;

  var Section = createClass({
    render: function () {
      var field = this.props.field;
      return h('fieldset', {
        className: 'section',
      }, [
        h('label', null, field.name),
        Object.keys(field.value).map(key =>
          h(Control, {field: field.value.$path[key].$field})
        )
      ]);
    }
  });

  var Slider = createClass({
    render: function () {
      var field = this.props.field;
      return h('div', {
        className: 'bar',
      }, [
        h('label', null, field.name),
        h('input', {
          type: 'range',
          min: field.min,
          max: field.max,
          step: field.step,
        }),
        h('span', null, field.value),
      ]);
    }
  });

  var Control = createClass({
    render: function () {
      switch(this.props.field.type) {
        case 'slider':
          return h(Slider, {field: this.props.field});
        case 'section':
          return h(Section, {field: this.props.field});
        default:
          throw new Error('Unknown field type, "'+this.props.field.type+'"');
      }
    }
  });

  var App = createClass({
    render: function () {
      return h('div', null,
        Object.keys(this.props.state).map(key =>
          h(Control, {field: this.props.state.$path[key].$field})
        )
      );
    }
  });

  render(h(App, {state: state}), document.body);

  return state;
}
