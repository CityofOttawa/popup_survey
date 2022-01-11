<?php

namespace Drupal\popup_survey;

use Drupal\Core\Config\Entity\ConfigEntityInterface;

/**
 * Provides an interface defining a PopupSurvey entity.
 */
interface PopupSurveyInterface extends ConfigEntityInterface {

  /**
   * Shows this popup on every page except the listed pages.
   */
  const POPUP_SURVEY_VISIBILITY_NOTLISTED = 0;

  /**
   * Shows this block on only the listed pages.
   */
  const POPUP_SURVEY_VISIBILITY_LISTED = 1;

  // Add get/set methods for your configuration properties here.
}
