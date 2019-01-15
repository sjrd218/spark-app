terraform {
    required_version = "> 0.11.7"
    backend "s3" {
        region               = "us-west-2"
        key                  = "project/spark"
        bucket               = "rundeck-online-terraform"
    }
}