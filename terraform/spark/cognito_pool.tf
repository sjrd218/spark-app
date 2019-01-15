resource "aws_cognito_user_pool" "spark" {
  name = "spark-${local.short_env}"
  username_attributes = ["email"]
  auto_verified_attributes = ["email"]
  
  schema = [{
    attribute_data_type = "String"
    mutable = "true"
    name = "rundeck_roles"
    required = "false"
    string_attribute_constraints {
      min_length = 1
      max_length = 256
    }
  },
  {
    attribute_data_type = "String"
    mutable = "true"
    name = "org"
    required = "false"
    string_attribute_constraints {
      min_length = 1
      max_length = 256
    }
  },
  {
    attribute_data_type = "String"
    name = "email"
    required = true
    string_attribute_constraints {
      min_length = 0
      max_length = 2048
    }
  }]
}

resource "aws_cognito_user_pool_client" "web" {
  name = "spark-web-${local.short_env}"
  user_pool_id = "${aws_cognito_user_pool.spark.id}"
  generate_secret     = false
  read_attributes = ["custom:rundeck_roles","custom:org"]
}

resource "aws_cognito_user_pool_client" "tod" {
  count = "${local.short_env  == "stage" ? 1 : 0}"

  name = "rundeck-tod-local"
  user_pool_id = "${aws_cognito_user_pool.spark.id}"
  generate_secret     = true
  explicit_auth_flows = ["ADMIN_NO_SRP_AUTH"]
  read_attributes = ["custom:rundeck_roles","custom:org"]
  allowed_oauth_flows = ["code"]
  allowed_oauth_scopes = ["phone","email","openid","profile"]
  allowed_oauth_flows_user_pool_client = true
  callback_urls = ["http://localhost:4440/user/oauth/okta"]
  logout_urls = ["http://localhost:4440/user/logout"]
}

resource "aws_cognito_user_pool_domain" "domain" {
  domain       = "rundeck-spark"
  user_pool_id = "${aws_cognito_user_pool.spark.id}"
}

output "spark_cognito_pool_arn" {
  value = "${aws_cognito_user_pool.spark.arn}"
}

output "spark_cognito_pool_id" {
  value = "${aws_cognito_user_pool.spark.id}"
}