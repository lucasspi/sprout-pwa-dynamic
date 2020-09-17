
import './css/custom_styles.css';
import './css/bootstrap.rtl.only.min.css';
import './css/bootstrap.min.css';
import './css/sass/themes/gogo.light.purple.scss';
let render = () => {
  import('./css/sass/themes/gogo.light.purple.scss').then(x => {
     require('./AppRenderer');
  });
};
render();