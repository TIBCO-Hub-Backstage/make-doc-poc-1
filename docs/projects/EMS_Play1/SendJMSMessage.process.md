# SendJMSMessage {#ProcessMain .concept}

Section contains description of Process " SendJMSMessage.process " .

**Parent topic:**[Processes](../../projects/EMS_Play1/common/process.md)

## Folder description: {#FolderDescription}

|Folder|Description|
|------|-----------|
| |No description|

## Process description: {#ProcessDescription}

|No description|

## Process definition: {#ProcessDefinition}

Full process path: SendJMSMessage.process

## Diagram: {#Diagram}

![](SendJMSMessage.process.png)

## Process starter activity: {#Starter}

Name: Start

Description:

## Process end activity: {#EndActivity}

Name: End

## Activities: {#Activities}

### Name: **_JMS Queue Sender_** {#JMS_Queue_Sender}

-   Type: *com.tibco.plugin.jms.JMSQueueSendActivity*
-   Resource Type: *ae.activities.JMSQueueSendActivity*
-   Description:
-   *Configuration:*
    -   PermittedMessageType = Text
    -   SessionAttributes
        -   transacted = false
        -   acknowledgeMode = 1
        -   maxSessions = 1
        -   destination = sample.queue
    -   ConfigurableHeaders
        -   JMSDeliveryMode = PERSISTENT
        -   JMSExpiration = 0
        -   JMSPriority = 4
    -   DeliveryDelay = 0
    -   ConnectionReference = [/JMS Connection.sharedjmscon](JMS_Connection.sharedjmscon.md)
-   *Input bindings:*
    -   Mapping table

        |Target|Source|
        |------|------|
        |**/ActivityInput****/Body**|"Hello JMS World"|

    -   Mapping tree

        |Mapping|
        |-------|
        |        ```

**ActivityInput**
 **Body** = "Hello JMS World"
        ```

|

    -   Source code

        |Mapping|
        |-------|
        |        ```

            <ns:ActivityInput xmlns:ns="http://www.tibco.com/namespaces/tnt/plugins/jms" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:pd="http://xmlns.tibco.com/bw/process/2003">
                <Body>
                    <xsl:value-of select="&quot;Hello JMS World&quot;"/>
                </Body>
            </ns:ActivityInput>
        
        ```

|


## Transitions: {#Transitions}

-   From: **_JMS Queue Sender_** -To: **_End_**
    -   Label:
    -   Condition: *Success*
    -   Description:

-   From: **_Start_** -To: **_JMS Queue Sender_**
    -   Label:
    -   Condition: *Success*
    -   Description:

