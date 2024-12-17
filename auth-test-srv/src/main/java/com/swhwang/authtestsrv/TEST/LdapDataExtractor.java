package com.swhwang.authtestsrv.TEST;

import org.springframework.ldap.core.DirContextOperations;

import javax.naming.directory.Attribute;
import javax.naming.directory.Attributes;
import javax.naming.NamingEnumeration;
import java.util.ArrayList;
import java.util.List;

public class LdapDataExtractor {

    public void printAllAttributes(DirContextOperations userData) {

        System.out.println("=== LDAP Attributes ===");
        try {
            // 모든 속성 출력
            Attributes attributes = userData.getAttributes();
            NamingEnumeration<? extends Attribute> allAttrs = attributes.getAll();
            while (allAttrs.hasMore()) {
                Attribute attr = allAttrs.next();
                System.out.println(attr.getID() + ": " + attr);
            }
        } catch (Exception e) {
            System.err.println("Error reading attributes: " + e.getMessage());
        }finally {
            System.out.println("=== LDAP Attributes ===");
        }
    }

    public List<String> extractSpecificAttributes(DirContextOperations userData) {
        List<String> extractedAttributes = new ArrayList<>();
        // 특정 속성 추출
        System.out.println("=== LDAP Attributes Extract===");
        extractedAttributes.add("DN: " + userData.getDn());
        extractedAttributes.add("uid: " + userData.getStringAttribute("uid"));
        extractedAttributes.add("cn: " + userData.getStringAttribute("cn"));

        // 다중 값 속성 처리 (예: mail)
        String[] mailAddresses = userData.getStringAttributes("mail");
        if (mailAddresses != null) {
            for (String mail : mailAddresses) {
                extractedAttributes.add("Mail Address: " + mail);
            }
        }
        System.out.println("=== LDAP Attributes Extract===");

        return extractedAttributes;
    }
}
