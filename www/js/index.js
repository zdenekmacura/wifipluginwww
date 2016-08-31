/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

$("#pickContact").click(function() {
    doContactPicker();
});

function doContactPicker() {
    navigator.contacts.pickContact(function(contact){
        console.log('The following contact has been selected:' + JSON.stringify(contact));
        var s = "Vybraná vytýkaná osoba:";
        s += getName(contact);
        if(contact.phoneNumbers && contact.phoneNumbers.length) {
            s+= ", Phone: "+contact.phoneNumbers[0].value+"<br/>";
        }
        document.querySelector("#phonenumber").innerHTML=contact.phoneNumbers[0].value;
        document.querySelector("#selectedContact").innerHTML=s;
    },function(err){
        console.log('Error: ' + err);
    });
}


/*
Handles iOS not returning displayName or returning null/""
*/
function getName(c) {
    var name = c.displayName;
    if(!name || name === "") {
        if(c.name.formatted) return c.name.formatted;
        if(c.name.givenName && c.name.familyName) return c.name.givenName +" "+c.name.familyName;
        return "Nameless";
    }
    return name;
}
