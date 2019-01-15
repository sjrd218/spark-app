terraform {
    required_version = "> 0.11.7"
    backend "s3" {
        region               = "us-west-2"
        key                  = "project/spark"
        bucket               = "rundeck-online-terraform"
    }
}

data "aws_caller_identity" "current" {}

provider "aws" {
    region = "us-west-2"
}

provider "kubernetes" {

}