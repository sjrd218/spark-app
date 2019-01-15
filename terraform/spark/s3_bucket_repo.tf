resource "aws_s3_bucket" "spark_repo" {
  bucket = "spark-repo-${local.short_env}.rundeck.com"
}

resource "aws_s3_bucket_notification" "spark_repo" {
  bucket = "${aws_s3_bucket.spark_repo.id}"

  topic {
    id = "artifact-uploaded"
    topic_arn = "${aws_sns_topic.artifact_upload.arn}"
    events    = ["s3:ObjectCreated:*"]
    filter_prefix = "staging/meta/"
  }

  topic {
    id = "artifact-signed"
    topic_arn = "${aws_sns_topic.artifact_signed.arn}"
    events    = ["s3:ObjectCreated:*"]
    filter_prefix = "oss/signed/meta/"
  }
}

output "s3_spark_repo_bucket" {
  value = "${aws_s3_bucket.spark_repo.bucket}"
}