import Plugin from '@jbrowse/core/Plugin'
import PluginManager from '@jbrowse/core/PluginManager'
import { ViewType, WidgetType } from '@jbrowse/core/pluggableElementTypes'
import { AbstractSessionModel, isAbstractMenuManager } from '@jbrowse/core/util'
import { getSession } from '@jbrowse/core/util'
import { version } from '../package.json'
import {
  configSchema as circularViewChordWidgetConfigSchema,
  stateModelFactory as circularViewChordWidgetStateModelFactory,
  ReactComponent as CircularViewChordWidgetComponent
} from './CircularViewChordWidget'
import {
  ReactComponent as HelloViewReactComponent,
  stateModel as helloViewStateModel,
} from './HelloView'

export default class TemplatePlugin extends Plugin {
  name = 'TemplatePlugin'
  version = version

  install(pluginManager: PluginManager) {
    pluginManager.addViewType(() => {
      return new ViewType({
        name: 'HelloView',
        stateModel: helloViewStateModel,
        ReactComponent: HelloViewReactComponent,
      })
    })
  }

  configure(pluginManager: PluginManager) {
    if (isAbstractMenuManager(pluginManager.rootModel)) {
      pluginManager.rootModel.appendToMenu('Add', {
        label: 'Hello View',
        onClick: (session: AbstractSessionModel) => {
          session.addView('HelloView', {})
        },
      })
    }
  }
}

export class DvaPlugin extends Plugin {
  name = 'DvaPlugin'
  version = version

  install(pluginManager: PluginManager) {
    pluginManager.addWidgetType(() => {
      return new WidgetType({
        name: 'CircularViewChordWidget',
        heading: 'Chord Details',
        configSchema: circularViewChordWidgetConfigSchema,
        stateModel: circularViewChordWidgetStateModelFactory(pluginManager),
        ReactComponent: CircularViewChordWidgetComponent,
      })
    })
  }

  // Jexl callback functions are adding inside configure in the plugin class
  configure(pluginManager: PluginManager) {
    // ...
    /* .jexl.addFunction is the method to add a function
        the first parameter is the name of your jexl function, and how you'll
        call it
        the second parameter is the supplementary properties the function
        needs, here, we need these three properties for
        the circular view's chord click function */
    pluginManager.jexl.addFunction(
      'openWidgetOnChordClick',
      (feature: any, chordTrack: any) => {
        // the session contains a ton of necessary information about the
        // present state of the app, here we use it to call the
        // showWidget function to show our widget upon chord click
        const session = getSession(chordTrack)

        if (session) {
          // @ts-expect-error
          session.showWidget(
            // @ts-expect-error
            session.addWidget(
              'CircularViewChordWidget',
              'circularViewChordWidget',
              { featureData: feature.toJSON() },
            ),
          )
          session.setSelection(feature)
        }
      },
    )
  }
}
