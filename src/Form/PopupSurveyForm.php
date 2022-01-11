<?php

namespace Drupal\popup_survey\Form;

use Drupal\Core\Entity\EntityForm;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Form\FormStateInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Form handler for the PopupSurvey add and edit forms.
 */
class PopupSurveyForm extends EntityForm {

  /**
   * Constructs an PopupSurveyForm object.
   *
   * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entityTypeManager
   *   The entityTypeManager.
   */
  public function __construct(EntityTypeManagerInterface $entityTypeManager) {
    $this->entityTypeManager = $entityTypeManager;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('entity_type.manager')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function form(array $form, FormStateInterface $form_state) {
    $form = parent::form($form, $form_state);

    $popup_survey = $this->entity;

    $form['label'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Label'),
      '#maxlength' => 255,
      '#default_value' => $popup_survey->label(),
      '#description' => $this->t("Label for the PopupSurvey."),
      '#required' => TRUE,
    ];

    $form['cancel_link_title'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Cancel Link Title'),
      '#maxlength' => 255,
      '#default_value' => $popup_survey->cancelLinkTitle(),
      '#description' => $this->t("Title for the PopupSurvey cancel link."),
      '#required' => TRUE,
    ];

    $form['popup_body'] = [
      '#type' => 'textarea',
      '#title' => $this->t('Popup Body'),
      '#maxlength' => 1024,
      '#default_value' => $popup_survey->popupBody(),
      '#description' => $this->t("Body text for the PopupSurvey."),
      '#required' => TRUE,
    ];

    $form['survey_link'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Survey Link'),
      '#maxlength' => 255,
      '#default_value' => $popup_survey->surveyLink(),
      '#description' => $this->t("Survey link URL for the PopupSurvey."),
      '#required' => TRUE,
    ];

    $form['survey_link_title'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Survey Link Title'),
      '#maxlength' => 255,
      '#default_value' => $popup_survey->surveyLinkTitle(),
      '#description' => $this->t("Survey link title for the PopupSurvey."),
      '#required' => TRUE,
    ];
    $form['id'] = [
      '#type' => 'machine_name',
      '#default_value' => $popup_survey->id(),
      '#machine_name' => [
        'exists' => [$this, 'exist'],
      ],
      '#disabled' => !$popup_survey->isNew(),
    ];

    // You will need additional form elements for your custom properties.
    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function save(array $form, FormStateInterface $form_state) {
    $popup_survey = $this->entity;
    $status = $popup_survey->save();

    if ($status === SAVED_NEW) {
      $this->messenger()->addMessage($this->t('The %label PopupSurvey created.', [
        '%label' => $popup_survey->label(),
      ]));
    }
    else {
      $this->messenger()->addMessage($this->t('The %label PopupSurvey updated.', [
        '%label' => $popup_survey->label(),
      ]));
    }

    $form_state->setRedirect('entity.popup_survey.collection');
  }

  /**
   * Helper function.
   *
   * Check whether an PopupSurvey configuration entity exists.
   */
  public function exist($id) {
    $entity = $this->entityTypeManager->getStorage('popup_survey')->getQuery()
      ->condition('id', $id)
      ->execute();
    return (bool) $entity;
  }

}
