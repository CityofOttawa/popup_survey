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

  /**
   * Get the cancel link.
   */
  public function cancelLinkTitle();

  /**
   * Get the body text.
   */
  public function popupBody();

  /**
   * Get the survey link.
   */
  public function surveyLink();

  /**
   * Get the link title.
   */
  public function surveyLinkTitle();

  /**
   * Get the override pages.
   */
  public function visibilityOverridePages();

  /**
   * Get override flag.
   */
  public function visibilityOverride();

  /**
   * Get override frequency.
   */
  public function frequencyOverride();
}
