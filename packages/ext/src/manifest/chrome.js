module.exports = {
  'manifest_version': 3,
  // browser_action
  'action': {
    'default_icon': 'icon-34.png',
    'default_title': 'OneKey',
    'default_popup': 'ui-popup.html',
  },
  // https://developer.chrome.com/docs/extensions/mv3/migrating_to_service_workers/
  'background': {
    // TODO move js file to root, as some browsers will not working
    'service_worker': 'background.bundle.js',
  },
};
