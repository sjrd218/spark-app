import Vue from 'vue'
export const EventBus = new Vue()

class EventConstants {
    CURRENT_USER = "user.current"
    LOGIN_FAILURE = "user.loginfailed"
    REGISTRATION_COMPLETE = "registration.success"
    VERIFICATION_COMPLETE = "verification.success"
    REGISTRATION_FAILURE = "registration.failure"
    NAV = "nav.location"
}

export const Events = new EventConstants()