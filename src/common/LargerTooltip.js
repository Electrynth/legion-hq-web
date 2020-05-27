import { Tooltip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

// Tooltip main argument is title

const LargerTooltip = withStyles(theme => ({
  tooltip: { fontSize: 16 }
}))(Tooltip);

export default LargerTooltip;
