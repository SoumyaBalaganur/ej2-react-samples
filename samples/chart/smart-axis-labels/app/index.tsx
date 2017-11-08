/**
 * Smart axis label sample
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Tooltip, DataLabel, IPointRenderEventArgs,
    ILoadedEventArgs, Category, ColumnSeries, Inject, LabelIntersectAction, EdgeLabelPlacement, ChartTheme
} from '@syncfusion/ej2-react-charts';
import { PropertyPane } from './property-pane';
import { EmitType, Browser } from '@syncfusion/ej2-base';
import { SampleBase } from './sample-base';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';

export let pointRender: EmitType<IPointRenderEventArgs> = (args: IPointRenderEventArgs): void => {
    let materialColors: string[] = ['#00bdae', '#404041', '#357cd2', '#e56590', '#f8b883', '#70ad47', '#dd8abd', '#7f84e8', '#7bb4eb',
        '#ea7a57', '#404041', '#00bdae'];
    let fabricColors: string[] = ['#4472c4', '#ed7d31', '#ffc000', '#70ad47', '#5b9bd5',
        '#c1c1c1', '#6f6fe2', '#e269ae', '#9e480e', '#997300', '#4472c4', '#70ad47', '#ffc000', '#ed7d31'];
    let selectedTheme: string = location.hash.split('/')[1];
    if (selectedTheme && selectedTheme.indexOf('fabric') > -1) {
        args.fill = fabricColors[args.point.index];
    } else {
        args.fill = materialColors[args.point.index];
    }
};

export let data1: any[] = [{ x: 'South Korea', y: 39 }, { x: 'India', y: 61 },
{ x: 'Pakistan', y: 20 }, { x: 'Germany', y: 65 },
{ x: 'Australia', y: 16 }, { x: 'Italy', y: 29 },
{ x: 'France', y: 45 }, { x: 'Saudi Arabia', y: 10 },
{ x: 'Russia', y: 41 }, { x: 'Mexico', y: 31 },
{ x: 'Brazil', y: 76 }, { x: 'China', y: 51 }];

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
	}`;
export class SmartAxisLabels extends SampleBase<{}, {}> {
    private chartInstance: ChartComponent;
    private dropElement: DropDownListComponent;
    private droplist: { [key: string]: Object }[] = [
        { value: 'Hide' },
        { value: 'Trim' },
        { value: 'Radar' },
        { value: 'Wrap' },
        { value: 'MultipleRows' },
        { value: 'Rotate45' },
        { value: 'Rotate90' },
        { value: 'None' }
    ];
    private change(): void {
        this.chartInstance.primaryXAxis.labelIntersectAction = this.dropElement.value as LabelIntersectAction;
        this.chartInstance.series[0].animation.enable = false;
        this.chartInstance.refresh();
    };
    private mode(): void {
        this.chartInstance.primaryXAxis.edgeLabelPlacement = this.modeElement.value as EdgeLabelPlacement;
        this.chartInstance.series[0].animation.enable = false;
        this.chartInstance.refresh();
    };
    private modeElement: DropDownListComponent;
    private modelist: { [key: string]: Object }[] = [
        { value: 'None' },
        { value: 'Hide' },
        { value: 'Shift' }
    ];
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section row'>
                    <div className='col-md-8'>
                        <ChartComponent id='charts' ref={chart => this.chartInstance = chart} style={{textAlign:"center"}}
                            primaryXAxis={{
                                valueType: 'Category',
                                interval: 1,
                                majorGridLines: { width: 0 },
                                labelIntersectAction: 'Hide'
                            }}
                            chartArea={{ border: { width: 0 } }}
                            primaryYAxis={{
                                labelStyle: { color: 'white' },
                                majorTickLines: { width: 0 },
                                majorGridLines: { width: 0 },
                                lineStyle: { width: 0 },
                            }}
                            load={this.load.bind(this)}
                            pointRender={pointRender}
                            title="Internet Users in Millions"
                            loaded={this.onChartLoad.bind(this)}
                            legendSettings={{ visible: false }}
                            tooltip={{ enable: true}}>
                            <Inject services={[Category, Category, ColumnSeries, Tooltip, DataLabel]} />
                            <SeriesCollectionDirective>
                                <SeriesDirective dataSource={data1} xName='x' yName='y' name="Users" type='Column' marker={{ dataLabel: { visible: true, position: Browser.isDevice ? 'Outer' : 'Top', font: { fontWeight: '600', color: Browser.isDevice ? '#404041' : '#ffffff' } } }}>
                                </SeriesDirective>
                            </SeriesCollectionDirective>
                        </ChartComponent>
                    </div>
                    <div className='col-md-4 property-section'>
                        <PropertyPane title='Properties'>
                            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                                <tr style={{ height: '50px' }}>
                                    <td>
                                        <div>Intersect Action: </div>
                                    </td>
                                    <td>
                                        <div>
                                            <DropDownListComponent width="120px" id="selmode" change={this.change.bind(this)} ref={d => this.dropElement = d} dataSource={this.droplist} fields={{ text: 'value', value: 'value' }} value="Hide" />
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td>
                                        <div>Edge Label<br/>Placement: </div></td>
                                    <td style={{ padding: 10}}>
                                        <DropDownListComponent width="120px" id="selmode" change={this.mode.bind(this)} ref={d => this.modeElement = d} dataSource={this.modelist} fields={{ text: 'value', value: 'value' }} value="None" />
                                    </td>
                                </tr>
                            </table>
                        </PropertyPane>
                    </div>
                </div>
            </div >
        )
    }
    public onChartLoad(args: ILoadedEventArgs): void {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');

    };
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)) as ChartTheme;
    };
}
ReactDOM.render(<SmartAxisLabels />, document.getElementById('sample'));