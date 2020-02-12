<?php
namespace Deployer;

require 'recipe/common.php';

task('deploy', [
    'deploy:info',
    'deploy:prepare',
    'deploy:lock',
    'deploy:release',
    'deploy:update_code',
    'deploy:shared',
    'deploy:vendors',
    'deploy:writable',
    //drush
    'deploy:symlink',
    'opcache:reset',
    'drush:cachereset',
    'deploy:unlock',
    'cleanup'
]);

set('application', 'progressdination.earth');

set('drupal_site', 'default');
set('shared_dirs', [
  'web/sites/{{drupal_site}}/files',
]);
set('shared_files', [
  'web/sites/{{drupal_site}}/settings.php',
  'web/sites/{{drupal_site}}/services.yml',
  'web/sites/settings.local.php',
  '.env',
]);
set('writable_dirs', [
  'web/sites/{{drupal_site}}/files',
]);

set('git_tty', true);
set('repository', 'git@github.com:Schlammsuhler/progressdination.git');

host('37.252.191.44')
  ->user('k005051')
  ->forwardAgent(true)
  ->multiplexing(true)
  ->set('deploy_path', '/var/www/{{application}}');

task('build', function () {
  // run('cd {{release_path}} && build');
});
task('opcache:reset', function () {
  run('sudo service apache2 reload');
});
task('drush:cachereset', function () {
  run('cd {{release_path}} && vendor/bin/drush cr');
});

after('deploy:failed', 'deploy:unlock');
