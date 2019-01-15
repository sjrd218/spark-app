locals {
  short_env = "${element(split("-", terraform.workspace), length(split("-", terraform.workspace)) - 1)}"

  tags = {
    Terraform = "true"
    Component = "spark"
    Environment = "${local.short_env}"
  }
}