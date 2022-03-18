# cp-charts

**cp-charts**

This repo is new and doesn't yet contain much. Contributions are welcome.

We are using Recharts for React based applications with charting needs.

### Recharts was chosen because it of the following criteria:

- Low barrier to entry. Recharts is built specifically for React
- Customizability -- it's fairly easy to customize colors, font size, legend icons, as well as provide custom components for things like tooltips, legends, tick marks, reference lines, etc.
- Documentation is not perfect, but it's decent. You can often find useful posts on StackOverflow because of the large developer community.
- 17.9k GitHub stars
  <br /><br />
  > This could change in the future if new and better open source charting libraries appear, or Recharts Github activity stalls for too long.
  > <br />

**This repo contains Storybook examples of how to:**

- Create and customize various charts in Recharts
- How to create a dynamic chart with an unknown number of series
- Examples of how to use some `d3` utilities, like `d3-scale`
- How to build a zoom control

## Custom Components

- CPChartToolTip
- CPChartShape
- CPChartZoomOutButton

## Utilities

Various utilities to assist with processing time series data, handle Recharts events, etc

## Install

`yarn`

## Develop

`yarn storybook`

### Test

`yarn test`

## Publishing

1. Increment version number in `package.json`.
   - increment last digit for minor changes and bugfixes
   - increment middle digit for new features and/or changes to current ones
   - increment first digit in the event of complete overhauls/major changes
   - for testing, append with `-beta<revision_number>`
2. Commit changes
3. Create PR and have it approved for merging into `master` branch
4. Run `yarn publish`
