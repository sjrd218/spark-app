resource "aws_sqs_queue" "artifact_upload" {
  name                      = "${local.short_env}-spark-artifact-upload"
  redrive_policy            = "{\"deadLetterTargetArn\":\"${aws_sqs_queue.artifact_upload_deadletter.arn}\",\"maxReceiveCount\":4}"
}

resource "aws_sqs_queue" "artifact_upload_deadletter" {
  name                      = "${local.short_env}-spark-artifact-upload-deadletter"
}

resource "aws_sqs_queue_policy" "artifact_upload" {
  queue_url = "${aws_sqs_queue.artifact_upload.id}"
  policy = "${data.aws_iam_policy_document.artifact-upload-sqs-policy.json}"
}

data "aws_iam_policy_document" "artifact-upload-sqs-policy" {
  policy_id = "__default_policy_ID"

  statement {
    actions = ["sqs:SendMessage"]

    condition {
      test     = "ArnEquals"
      variable = "aws:SourceArn"

      values = [
        "${aws_sns_topic.artifact_upload.arn}",
      ]
    }

    effect = "Allow"

    principals {
      type        = "AWS"
      identifiers = ["*"]
    }

    resources = [
      "${aws_sqs_queue.artifact_upload.arn}",
    ]

    sid = "__default_statement_ID"
  }
}

output "sqs_queue_spark_artifact_upload" {
  value = {
    "arn" = "${aws_sqs_queue.artifact_upload.arn}"
    "url" = "${aws_sqs_queue.artifact_upload.id}"
  }
}