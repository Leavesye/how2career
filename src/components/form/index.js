import axForm from './form.js';
import axFormItem from './formItem.vue';

axForm.install = function( Vue ){
  Vue.component( 'axForm', axForm );
}

axFormItem.install = function( Vue ){
  Vue.component( 'axFormItem', axFormItem );
}

export {
  axForm,
  axFormItem,
}
