import commander from 'static/commander.png';
import operative from 'static/operative.png';
import corps from 'static/corps.png';
import special from 'static/special.png';
import support from 'static/support.png';
import heavy from 'static/heavy.png';

const ranks = {
  commander: {
    name: 'Commander',
    title: 'Add a Commander unit.',
    icon: commander
  },
  operative: {
    name: 'Operative',
    title: 'Add a Operative unit.',
    icon: operative
  },
  corps: {
    name: 'Corps',
    title: 'Add a Corps unit.',
    icon: corps
  },
  special: {
    name: 'Special Forces',
    title: 'Add a Special Forces unit.',
    icon: special
  },
  support: {
    name: 'Support',
    title: 'Add a Support unit.',
    icon: support
  },
  heavy: {
    name: 'Heavy',
    title: 'Add a Heavy unit.',
    icon: heavy
  }
};

export default ranks;
