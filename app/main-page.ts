/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

import { EventData, Page } from "@nativescript/core";
import { HelloWorldModel } from "./main-view-model";

import { messaging } from "@nativescript/firebase/messaging";

messaging
	.registerForPushNotifications({
		onPushTokenReceivedCallback: (token: string): void => {
			console.log("Firebase plugin received a push token: " + token);
		},

		onMessageReceivedCallback: (message) => {
			console.log("Push message received: " + message.title);
		},

		// Whether you want this plugin to automatically display the notifications or just notify the callback. Currently used on iOS only. Default true.
		showNotifications: true,

		// Whether you want this plugin to always handle the notifications when the app is in foreground. Currently used on iOS only. Default false.
		showNotificationsWhenInForeground: true,
	})
	.then(() => {
		console.log("Registered for push");
		messaging
			.getCurrentPushToken()
			.then((token) => console.log(`Current push token: ${token}`));
	});

// Event handler for Page 'navigatingTo' event attached in main-page.xml
export function navigatingTo(args: EventData) {
	/*
    This gets a reference this page’s <Page> UI component. You can
    view the API reference of the Page to see what’s available at
    https://docs.nativescript.org/api-reference/classes/_ui_page_.page.html
    */
	const page = <Page>args.object;

	/*
    A page’s bindingContext is an object that should be used to perform
    data binding between XML markup and TypeScript code. Properties
    on the bindingContext can be accessed using the {{ }} syntax in XML.
    In this example, the {{ message }} and {{ onTap }} bindings are resolved
    against the object returned by createViewModel().

    You can learn more about data binding in NativeScript at
    https://docs.nativescript.org/core-concepts/data-binding.
    */
	page.bindingContext = new HelloWorldModel();
}
