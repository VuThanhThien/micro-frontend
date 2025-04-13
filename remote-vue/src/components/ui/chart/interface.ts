/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Spacing } from '@unovis/ts';

type KeyOf<T extends Record<string, any>> = Extract<keyof T, string>;

export interface BaseChartProps<T extends Record<string, any>> {
  /**
   * Select the categories from your data. Used to populate the legend and toolip.
   */
  categories: KeyOf<T>[];
  /**
   * Change the default colors.
   */
  colors?: string[];
  /**
   * The source data, in which each entry is a dictionary.
   */
  data: T[];
  /**
   * Change the opacity of the non-selected field
   * @default 0.2
   */
  filterOpacity?: number;
  /**
   * Sets the key to map the data to the axis.
   */
  index: KeyOf<T>;
  /**
   * Margin of each the container
   */
  margin?: Spacing;
  /**
   * Controls the visibility of gridline.
   * @default true
   */
  showGridLine?: boolean;
  /**
   * Controls the visibility of legend.
   * @default true
   */
  showLegend?: boolean;
  /**
   * Controls the visibility of tooltip.
   * @default true
   */
  showTooltip?: boolean;
  /**
   * Controls the visibility of the X axis.
   * @default true
   */
  showXAxis?: boolean;
  /**
   * Controls the visibility of the Y axis.
   * @default true
   */
  showYAxis?: boolean;
  /**
   * Function to format X label
   */
  xFormatter?: (tick: Date | number, i: number, ticks: Date[] | number[]) => string;
  /**
   * Function to format Y label
   */
  yFormatter?: (tick: Date | number, i: number, ticks: Date[] | number[]) => string;
}
