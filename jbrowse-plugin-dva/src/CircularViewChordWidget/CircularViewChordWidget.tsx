import React from 'react'
import { observer } from 'mobx-react'
// JBrowse uses material-ui where possible for basic components
import { TextField } from '@material-ui/core'
// @jbrowse/core also has some reusable components available
import {
  FeatureDetails,
  BaseCard,
} from '@jbrowse/core/BaseFeatureWidget/BaseFeatureDetail'

const CircularViewChordWidget = observer(({ model }: { model: any }) => {
  // these are two properties we have in our model
  // widgetByline is going to start out as an empty string
  // but featureData will be populated with the information from our chord;
  // we'll talk about how that happens more later
  const { featureData, widgetByline } = model
  return (
    <div>
      {/* features will always have a name, start, end, and id; they can
      have additional information too */}
      <BaseCard title={featureData.name}>
        {/* here we're just demonstrating using a basic property from the
        model and updating it with observer */}
        <h2>{widgetByline}</h2>
        <p>Care to change the widget byline?</p>
        <TextField
          onChange={(e: any) => model.setWidgetByline(e.target.value)}
        />
      </BaseCard>
      {/* the FeatureDetails component is a proprietary JBrowse component
      for displaying feature details clearly */}
      <FeatureDetails feature={featureData} model={model} />
    </div>
  )
})

export default CircularViewChordWidget