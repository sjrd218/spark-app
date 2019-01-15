resource "aws_sns_topic" "artifact_upload" {
  name = "${local.short_env}-spark-artifact-upload"
}

resource "aws_sns_topic_policy" "artifact_upload" {
  arn = "${aws_sns_topic.artifact_upload.arn}"

  policy = "${data.aws_iam_policy_document.artifact-upload-topic-policy.json}"
}

data "aws_iam_policy_document" "artifact-upload-topic-policy" {
  policy_id = "__default_policy_ID"

  statement {
    actions = ["SNS:Publish"]

    condition {
      test     = "ArnEquals"
      variable = "aws:SourceArn"

      values = [
        "${aws_s3_bucket.spark_repo.arn}",
      ]
    }

    effect = "Allow"

    principals {
      type        = "AWS"
      identifiers = ["*"]
    }

    resources = [
      "${aws_sns_topic.artifact_upload.arn}",
    ]

    sid = "__default_statement_ID"
  }
}

resource "aws_sns_topic_subscription" "artifact_upload_sqs_target" {
  topic_arn = "${aws_sns_topic.artifact_upload.arn}"
  protocol  = "sqs"
  endpoint  = "${aws_sqs_queue.artifact_upload.arn}"
}
