ALTER TABLE `qr_code` ADD `business_type` VARCHAR(255) NOT NULL AFTER `headline`;

CREATE TABLE review_survey (
    id INT PRIMARY KEY AUTO_INCREMENT,
    survey_review TEXT,
    review_id INT,
    user_id INT,
    qr_code_id INT
);
