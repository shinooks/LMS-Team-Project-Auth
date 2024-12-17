package com.swhwang.authtestsrv.ldap.domain;

public enum LdapGroupPrefix {
    S("ou=students,ou=Users"),
    P("ou=professors,ou=Users"),
    E("ou=staff,ou=Users");

    private final String baseDn;

    LdapGroupPrefix(String baseDn) {
        this.baseDn = baseDn;
    }

    public String getBaseDn() {
        return baseDn;
    }

}