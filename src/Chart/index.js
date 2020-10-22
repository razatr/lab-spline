import React, { Fragment } from 'react'
import { VictoryChart, VictoryLine, VictoryTheme, VictoryContainer, VictoryLegend } from 'victory'
import { func, spline } from './spline'

function Chart() {

    return (<Fragment>
        <VictoryChart
            maxDomain={ { x: 7, y: 4 } }
            minDomain={ { x: -1, y: -4 } }
            theme={ VictoryTheme.material }
            containerComponent={ <VictoryContainer responsive={ false }/> }
            width={ 800 }
            height={ 800 }>
            <VictoryLegend x={ 200 } y={ 50 }
                           orientation="horizontal"
                           gutter={ 20 }
                           itemsPerRow={2}
                           data={ [
                               {
                                   name: 'Graph of a spline polynomial',
                                   symbol: { fill: '4256b1' },
                                   labels: { fill: '4256b1' }
                               },
                               {
                                   name: 'Graph of a function',
                                   symbol: { fill: 'd00f50' },
                                   labels: { fill: 'd00f50' }
                               },
                               {
                                   name: 'Graph of a spline polynomial',
                                   symbol: { fill: '10e300' },
                                   labels: { fill: '10e300' }
                               }
                           ] }
            />
            <VictoryLine data={ func }
                         animate={ { duration: 1500 } }
                         style={ {
                             data: {
                                 stroke: '#d00f50'
                             }
                         } }/>
            {spline.map((item) => (<VictoryLine data={ item.points }
                                                animate={ { duration: 1500, delay: 1000 } }
                                                style={ {
                                                    data: {
                                                        stroke: item.color
                                                    }
                                                } }/>))}

        </VictoryChart>
    </Fragment>)
}

export default Chart