resource "aws_s3_bucket" "spark_site" {
  bucket = "spark-site-${local.short_env}.rundeck.com"
}

output "s3_spark_site_bucket" {
  value = {
      bucket = "${aws_s3_bucket.spark_site.bucket}"
      arn = "${aws_s3_bucket.spark_site.arn}"
  }
}