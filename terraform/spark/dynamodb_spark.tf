resource "aws_dynamodb_table" "artifacts" {
  name = "${local.short_env}-spark-artifacts"

  read_capacity  = 10
  write_capacity = 10

  hash_key = "id"

  attribute = [{
    name = "id"
    type = "S"
  }]
}

output "aws_dynamodb_table_spark_artifacts_id" {
  value = {
    id  = "${aws_dynamodb_table.artifacts.id}"
    arn = "${aws_dynamodb_table.artifacts.arn}"
  }
}


resource "aws_dynamodb_table" "developers" {
  name = "${local.short_env}-spark-developers"

  read_capacity  = 10
  write_capacity = 10

  hash_key = "id"

  attribute = [{
    name = "id"
    type = "S"
  }]
}

output "aws_dynamodb_table_spark_developers_id" {
  value = {
    id  = "${aws_dynamodb_table.artifacts.id}"
    arn = "${aws_dynamodb_table.artifacts.arn}"
  }
}