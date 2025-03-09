import EditRoute from './edit';

export default class NewRoute extends EditRoute {
  controllerName = 'edit';
  renderTemplate(controller, model) {
    this.render('edit', {
      controller,
      model,
    });
  }
}
