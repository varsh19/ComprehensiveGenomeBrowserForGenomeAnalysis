import { ConfigurationSchema } from '@jbrowse/core/configuration'
import PluginManager from '@jbrowse/core/PluginManager'
import { ElementId } from '@jbrowse/core/util/types/mst'
import { types } from 'mobx-state-tree'

export { default as ReactComponent } from './CircularViewChordWidget'
export const configSchema = ConfigurationSchema('CircularViewChordWidget', {})

export function stateModelFactory(pluginManager: PluginManager) {
  const stateModel = types
    .model('CircularViewChordWidget', {
      id: ElementId,
      type: types.literal('CircularViewChordWidget'),
      featureData: types.frozen({}),
    })
    .actions(self => ({
      setFeatureData(data: any) {
        self.featureData = data
      },
      clearFeatureData() {
        self.featureData = {}
      },
    }))

  return stateModel
}