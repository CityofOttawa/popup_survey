<?php
namespace Drupal\popup_survey\Entity;

use Drupal\Core\Config\Entity\ConfigEntityBase;
use Drupal\popup_survey\PopupSurveyInterface;

/**
 * Defines the PopupSurvey entity.
 *
 * @ConfigEntityType(
 *   id = "popup_survey",
 *   label = @Translation("Popup Survey"),
 *   handlers = {
 *     "list_builder" = "Drupal\popup_survey\Controller\PopupSurveyListBuilder",
 *     "form" = {
 *       "add" = "Drupal\popup_survey\Form\PopupSurveyForm",
 *       "edit" = "Drupal\popup_survey\Form\PopupSurveyForm",
 *       "delete" = "Drupal\popup_survey\Form\PopupSurveyDeleteForm",
 *     }
 *   },
 *   config_prefix = "popup_survey",
 *   admin_permission = "administer site configuration",
 *   entity_keys = {
 *     "id" = "id",
 *     "label" = "label",
 *   },
 *   config_export = {
 *     "id",
 *     "label",
 *     "cancel_link_title",
 *     "popup_body",
 *     "survey_link",
 *     "survey_link_title"
 *   },
 *   links = {
 *     "edit-form" = "/admin/config/system/popup_survey/{popup_survey}",
 *     "delete-form" = "/admin/config/system/popup_survey/{popup_survey}/delete",
 *   }
 * )
 */
class PopupSurvey extends ConfigEntityBase implements PopupSurveyInterface {

  /**
   * The PopupSurvey ID.
   *
   * @var string
   */
  protected $id;

  /**
   * The PopupSurvey cancel link title.
   *
   * @var string
   */
  protected $cancel_link_title;

  /**
   * The PopupSurvey body.
   *
   * @var string
   */
  protected $popup_body;

  /**
   * The PopupSurvey link.
   *
   * @var string
   */
  protected $survey_link;

  /**
   * The PopupSurvey link title.
   *
   * @var string
   */
  protected $survey_link_title;

  // Your specific configuration property get/set methods go here,
  // implementing the interface.

  public function cancelLinkTitle() {
    return $this->cancel_link_title;
  }

  public function popupBody() {
    return $this->popup_body;
  }

  public function surveyLink() {
    return $this->survey_link;
  }

  public function surveyLinkTitle() {
    return $this->survey_link_title;
  }
}
