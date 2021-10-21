<?php

namespace Drupal\popup_survey\Form;

use Drupal\Core\Entity\EntityTypeManager;
use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Configure popup_survey settings for this site.
 */
class PopupSurveySettingsForm extends ConfigFormBase {
  /**
   * Shows the popup on every page except the listed pages.
   */
  const POPUP_VISIBILITY_NOTLISTED = 0;

  /**
   * Shows the popup on only the listed pages.
   */
  const POPUP_VISIBILITY_LISTED = 1;

  /**
   * Config settings.
   *
   * @var string
   */
  const SETTINGS = 'popup_survey.settings';

  /**
   * @var EntityTypeManagerInterface $entity_manager
   */
  protected $entity_manager;

  /**
   * Class constructor.
   */
  public function __construct(EntityTypeManagerInterface $entity_manager) {
    $this->entity_manager = $entity_manager;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    // Instantiates this form class.
    return new static(
      // Load the service required to construct this class.
      $container->get('entity_type.manager')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'popup_survey_admin_settings';
  }

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return [
      static::SETTINGS,
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->config(static::SETTINGS);

    $config_entity_default = ($config->get('popup_survey_config_entity')) ?: 0;
    $form['popup_survey_config_entity'] = array(
      '#type'        => 'select',
      '#title'       => t('Popup Config Entity'),
      '#description' => t('Select the PopupSurvey config entity that you would like to display to visitors as the survey invitation. If you wish not to display the popup select \'none\' for the popup block.'),
      '#options'     => $this->popupSurveyEntityOptions(),
      '#default_value' => $config_entity_default,
      '#required' => TRUE,
    );

    $frequency_default = ($config->get('popup_survey_frequency')) ?: 1;
    $form['popup_survey_frequency'] = array(
      '#type'        => 'select',
      '#title'       => t('Popup Frequency'),
      '#description' => t('Display the popup for one out of every # visitors.'),
      '#options'     => $this->popupSurveyFrequencyOptions(),
      '#default_value' => $frequency_default,
      '#required' => TRUE,
    );

    // Visibility settings.
    $form['visibility_title'] = array(
      '#type' => 'item',
      '#title' => t('Visibility settings'),
    );

    $options = array(
      self::POPUP_VISIBILITY_NOTLISTED => t('All pages except those listed'),
      self::POPUP_VISIBILITY_LISTED => t('Only the listed pages'),
    );

    $ua_exclude_default = ($config->get('popup_survey_ua_exclude')) ?: 'alexa|bot|crawl|bing|facebookexternalhit|feedburner|google|preview|nagios|postrank|pingdom|slurp|spider|yahoo|yandex|sogou';
    $form['popup_survey_ua_exclude'] = array(
      '#type' => 'textarea',
      '#title' => t('Block blacklist'),
      '#description' => t('User agents that match the list will not be presented with the survey popup.  Separate terms by a pipe (|) without spaces.  Do not enter line breaks.'),
      '#default_value' => $ua_exclude_default,
    );

    $visibility_options_default = ($config->get('popup_survey_visibility_options')) ?: self::POPUP_VISIBILITY_NOTLISTED;
    $form['popup_survey_visibility_options'] = array(
      '#type' => 'radios',
      '#title' => t('Show block on specific pages'),
      '#options' => $options,
      '#default_value' => $visibility_options_default
    );

    $visibility_options_pages_default = ($config->get('popup_survey_visibility_options_pages')) ?: '';
    $form['popup_survey_visibility_options_pages'] = array(
      '#type' => 'textarea',
      '#title' => '<span class="element-invisible">' . t('Pages') . '</span>',
      '#default_value' => $visibility_options_pages_default,
      '#description' => t("Specify pages by using their paths. Enter one path per line. The '*' character is a wildcard. Example paths are %blog for the blog page and %blog-wildcard for every personal blog. %front is the front page.", array('%blog' => 'blog', '%blog-wildcard' => 'blog/*', '%front' => '<front>')),
    );

    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state) {
    $ua = $form_state->getValue('popup_survey_ua_exclude');
    if( strlen($ua) > 0 && (substr($ua,0,1) == '|' || substr($ua,strlen($ua)-1,1)=='|') ) {
      $form_state->setError($form['popup_survey_ua_exclude'], t('Value cannot start or end with a pipe (|) delimiter'));
    }
  }
  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    // Retrieve the configuration.
    $this->configFactory->getEditable(static::SETTINGS)
      // Set the submitted configuration setting.
      ->set('popup_survey_config_entity', $form_state->getValue('popup_survey_config_entity'))
      ->set('popup_survey_frequency', $form_state->getValue('popup_survey_frequency'))
      ->set('popup_survey_ua_exclude', $form_state->getValue('popup_survey_ua_exclude'))
      ->set('popup_survey_visibility_options', $form_state->getValue('popup_survey_visibility_options'))
      ->set('popup_survey_visibility_options_pages', $form_state->getValue('popup_survey_visibility_options_pages'))
      ->save();

    parent::submitForm($form, $form_state);
  }

  protected function popupSurveyEntityOptions() {
    $entities = $this->entity_manager->getStorage('popup_survey')->loadMultiple();
    return array_combine($val = array_keys($entities), $val);
  }

  protected function popupSurveyFrequencyOptions() {
    return array_combine($options = range(1, 100), $options);
  }
}
