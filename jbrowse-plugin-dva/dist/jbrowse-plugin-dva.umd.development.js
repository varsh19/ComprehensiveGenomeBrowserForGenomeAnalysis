(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@jbrowse/core/Plugin'), require('@jbrowse/core/pluggableElementTypes'), require('@jbrowse/core/util'), require('@jbrowse/core/configuration'), require('@jbrowse/core/util/types/mst'), require('mobx-state-tree'), require('react'), require('mobx-react'), require('@material-ui/core'), require('@jbrowse/core/BaseFeatureWidget/BaseFeatureDetail')) :
  typeof define === 'function' && define.amd ? define(['exports', '@jbrowse/core/Plugin', '@jbrowse/core/pluggableElementTypes', '@jbrowse/core/util', '@jbrowse/core/configuration', '@jbrowse/core/util/types/mst', 'mobx-state-tree', 'react', 'mobx-react', '@material-ui/core', '@jbrowse/core/BaseFeatureWidget/BaseFeatureDetail'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.JBrowsePluginDva = {}, global.JBrowseExports["@jbrowse/core/Plugin"], global.JBrowseExports["@jbrowse/core/pluggableElementTypes"], global.JBrowseExports["@jbrowse/core/util"], global.JBrowseExports["@jbrowse/core/configuration"], global.JBrowseExports["@jbrowse/core/util/types/mst"], global.JBrowseExports["mobx-state-tree"], global.JBrowseExports.react, global.JBrowseExports["mobx-react"], global.JBrowseExports["@material-ui/core"], global.JBrowseExports["@jbrowse/core/BaseFeatureWidget/BaseFeatureDetail"]));
})(this, (function (exports, Plugin, pluggableElementTypes, util, configuration, mst, mobxStateTree, React, mobxReact, core, BaseFeatureDetail) { 'use strict';

  var version = "0.0.1";

  const CircularViewChordWidget = mobxReact.observer(({ model }) => {
      // these are two properties we have in our model
      // widgetByline is going to start out as an empty string
      // but featureData will be populated with the information from our chord;
      // we'll talk about how that happens more later
      const { featureData, widgetByline } = model;
      return (React.createElement("div", null,
          React.createElement(BaseFeatureDetail.BaseCard, { title: featureData.name },
              React.createElement("h2", null, widgetByline),
              React.createElement("p", null, "Care to change the widget byline?"),
              React.createElement(core.TextField, { onChange: (e) => model.setWidgetByline(e.target.value) })),
          React.createElement(BaseFeatureDetail.FeatureDetails, { feature: featureData, model: model })));
  });

  const configSchema = configuration.ConfigurationSchema('CircularViewChordWidget', {});
  function stateModelFactory(pluginManager) {
      const stateModel = mobxStateTree.types
          .model('CircularViewChordWidget', {
          id: mst.ElementId,
          type: mobxStateTree.types.literal('CircularViewChordWidget'),
          featureData: mobxStateTree.types.frozen({}),
      })
          .actions(self => ({
          setFeatureData(data) {
              self.featureData = data;
          },
          clearFeatureData() {
              self.featureData = {};
          },
      }));
      return stateModel;
  }

  function ReactComponent({ model }) {
      const [error, setError] = React.useState();
      const ref = React.useRef(null);
      const refFile1 = React.useRef(null);
      React.useRef(null);
      const session = util.getSession(model);
      return (React.createElement("div", { style: { padding: 50 } },
          React.createElement("h1", null, "Analytics plugin"),
          React.createElement("div", { style: { display: 'flex' } },
              React.createElement("div", { style: { flex: 1, marginRight: '10px' } },
                  React.createElement("h2", null, "Quality Trimming"),
                  React.createElement("p", null, "Perform quality trimming with FastP"),
                  React.createElement("label", null, "Upload a FASTQ for Read 1: "),
                  React.createElement("input", { ref: ref, type: "file" }),
                  React.createElement("br", null),
                  React.createElement("label", null, "Upload a FASTQ for Read 2: "),
                  React.createElement("input", { ref: ref, type: "file" }),
                  React.createElement("div", { style: { margin: '10px 0' } }),
                  React.createElement("button", { onClick: async () => {
                          try {
                              if (!ref.current) {
                                  return;
                              }
                              const fastaFile = '/test_data/volvox/volvox.fa';
                              const faiFile = '/test_data/volvox/volvox.fa.fai';
                              session.addSessionAssembly({
                                  name: 'newvolvox',
                                  sequence: {
                                      type: 'ReferenceSequenceTrack',
                                      trackId: 'newvolvox_refseq',
                                      adapter: {
                                          type: 'IndexedFastaAdapter',
                                          fastaLocation: {
                                              uri: fastaFile,
                                              locationType: 'UriLocation',
                                          },
                                          faiLocation: {
                                              uri: faiFile,
                                              locationType: 'UriLocation',
                                          },
                                      },
                                  },
                              });
                              const view = session.addView('LinearGenomeView');
                              // dynamically navigate to a position on the new assembly!
                              view.navToLocString('ctgB:1..1000', 'newvolvox');
                          }
                          catch (e) {
                              console.error(e);
                              setError(e);
                          }
                      } }, "Submit"),
                  error !== undefined ? (React.createElement("div", { style: { color: 'red' } }, `${error}`)) : null),
              React.createElement("div", { style: { flex: 1, marginRight: '10px' } },
                  React.createElement("h2", null, "Genome Assembly"),
                  React.createElement("p", null, "Perform a de novo assembly with Spades"),
                  React.createElement("label", null, "Upload a FASTQ for Read 1: "),
                  React.createElement("input", { ref: ref, type: "file" }),
                  React.createElement("br", null),
                  React.createElement("label", null, "Upload a FASTQ for Read 2: "),
                  React.createElement("input", { ref: ref, type: "file" }),
                  React.createElement("div", { style: { margin: '10px 0' } }),
                  React.createElement("button", { onClick: async () => {
                          try {
                              if (!ref.current) {
                                  return;
                              }
                              const fastaFile = '/test_data/volvox/volvox.fa';
                              const faiFile = '/test_data/volvox/volvox.fa.fai';
                              session.addSessionAssembly({
                                  name: 'newvolvox',
                                  sequence: {
                                      type: 'ReferenceSequenceTrack',
                                      trackId: 'newvolvox_refseq',
                                      adapter: {
                                          type: 'IndexedFastaAdapter',
                                          fastaLocation: {
                                              uri: fastaFile,
                                              locationType: 'UriLocation',
                                          },
                                          faiLocation: {
                                              uri: faiFile,
                                              locationType: 'UriLocation',
                                          },
                                      },
                                  },
                              });
                              const view = session.addView('LinearGenomeView');
                              // dynamically navigate to a position on the new assembly!
                              view.navToLocString('ctgB:1..1000', 'newvolvox');
                          }
                          catch (e) {
                              console.error(e);
                              setError(e);
                          }
                      } }, "Submit"),
                  error !== undefined ? (React.createElement("div", { style: { color: 'red' } }, `${error}`)) : null),
              React.createElement("div", { style: { flex: 1, marginRight: '10px' } },
                  React.createElement("h2", null, "Gene Prediction"),
                  React.createElement("p", null, "Perform gene prediction with GeneMarkS2"),
                  React.createElement("label", null, "Upload a FASTA: "),
                  React.createElement("input", { ref: ref, type: "file" }),
                  React.createElement("div", { style: { margin: '10px 0' } }),
                  React.createElement("button", { onClick: async () => {
                          try {
                              if (!ref.current) {
                                  return;
                              }
                              const fastaFile = '/test_data/volvox/volvox.fa';
                              const faiFile = '/test_data/volvox/volvox.fa.fai';
                              session.addSessionAssembly({
                                  name: 'newvolvox',
                                  sequence: {
                                      type: 'ReferenceSequenceTrack',
                                      trackId: 'newvolvox_refseq',
                                      adapter: {
                                          type: 'IndexedFastaAdapter',
                                          fastaLocation: {
                                              uri: fastaFile,
                                              locationType: 'UriLocation',
                                          },
                                          faiLocation: {
                                              uri: faiFile,
                                              locationType: 'UriLocation',
                                          },
                                      },
                                  },
                              });
                              const view = session.addView('LinearGenomeView');
                              // dynamically navigate to a position on the new assembly!
                              view.navToLocString('ctgB:1..1000', 'newvolvox');
                          }
                          catch (e) {
                              console.error(e);
                              setError(e);
                          }
                      } }, "Submit"),
                  error !== undefined ? (React.createElement("div", { style: { color: 'red' } }, `${error}`)) : null),
              React.createElement("div", { style: { flex: 1, marginRight: '10px' } },
                  React.createElement("h2", null, "Gene Annotation"),
                  React.createElement("p", null, "Perform gene annotation with eggNOG"),
                  React.createElement("label", null, "Upload a GFF3: "),
                  React.createElement("input", { ref: refFile1, type: "file" }),
                  React.createElement("div", { style: { margin: '10px 0' } }),
                  React.createElement("button", { onClick: async () => {
                          try {
                              if (!ref.current) {
                                  return;
                              }
                              const fastaFile = '/test_data/volvox/volvox.fa';
                              const faiFile = '/test_data/volvox/volvox.fa.fai';
                              session.addSessionAssembly({
                                  name: 'newvolvox',
                                  sequence: {
                                      type: 'ReferenceSequenceTrack',
                                      trackId: 'newvolvox_refseq',
                                      adapter: {
                                          type: 'IndexedFastaAdapter',
                                          fastaLocation: {
                                              uri: fastaFile,
                                              locationType: 'UriLocation',
                                          },
                                          faiLocation: {
                                              uri: faiFile,
                                              locationType: 'UriLocation',
                                          },
                                      },
                                  },
                              });
                              const view = session.addView('LinearGenomeView');
                              // dynamically navigate to a position on the new assembly!
                              view.navToLocString('ctgB:1..1000', 'newvolvox');
                          }
                          catch (e) {
                              console.error(e);
                              setError(e);
                          }
                      } }, "Submit"),
                  error !== undefined ? (React.createElement("div", { style: { color: 'red' } }, `${error}`)) : null))));
  }

  const stateModel = mobxStateTree.types
      .model({
      id: mst.ElementId,
      type: mobxStateTree.types.literal('HelloView'),
  })
      .actions(() => ({
      // unused but required by your view
      setWidth() { },
  }));

  class TemplatePlugin extends Plugin {
      name = 'TemplatePlugin';
      version = version;
      install(pluginManager) {
          pluginManager.addViewType(() => {
              return new pluggableElementTypes.ViewType({
                  name: 'HelloView',
                  stateModel: stateModel,
                  ReactComponent: ReactComponent,
              });
          });
      }
      configure(pluginManager) {
          if (util.isAbstractMenuManager(pluginManager.rootModel)) {
              pluginManager.rootModel.appendToMenu('Add', {
                  label: 'Hello View',
                  onClick: (session) => {
                      session.addView('HelloView', {});
                  },
              });
          }
      }
  }
  class DvaPlugin extends Plugin {
      name = 'DvaPlugin';
      version = version;
      install(pluginManager) {
          pluginManager.addWidgetType(() => {
              return new pluggableElementTypes.WidgetType({
                  name: 'CircularViewChordWidget',
                  heading: 'Chord Details',
                  configSchema: configSchema,
                  stateModel: stateModelFactory(),
                  ReactComponent: CircularViewChordWidget,
              });
          });
      }
      // Jexl callback functions are adding inside configure in the plugin class
      configure(pluginManager) {
          // ...
          /* .jexl.addFunction is the method to add a function
              the first parameter is the name of your jexl function, and how you'll
              call it
              the second parameter is the supplementary properties the function
              needs, here, we need these three properties for
              the circular view's chord click function */
          pluginManager.jexl.addFunction('openWidgetOnChordClick', (feature, chordTrack) => {
              // the session contains a ton of necessary information about the
              // present state of the app, here we use it to call the
              // showWidget function to show our widget upon chord click
              const session = util.getSession(chordTrack);
              if (session) {
                  // @ts-expect-error
                  session.showWidget(
                  // @ts-expect-error
                  session.addWidget('CircularViewChordWidget', 'circularViewChordWidget', { featureData: feature.toJSON() }));
                  session.setSelection(feature);
              }
          });
      }
  }

  exports.DvaPlugin = DvaPlugin;
  exports.default = TemplatePlugin;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=jbrowse-plugin-dva.umd.development.js.map
