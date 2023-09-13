# Application {#ApplicationMain .concept}

Section contains description of Application " TIBCO.xml " .

**Parent topic:**[Application settings](../../../projects/HelloWorld.application/common/application.md)

## Overview {#Overview}

-   ID: HelloWorld.application
-   Version: 1.1.0.qualifier
-   Name: HelloWorld application
-   Vendor: TIBCO Software Inc.
-   Description:

## Module Profiles {#ModuleProfile}

|Module Property Name|default|
|--------------------|-------|
|**//HelloWorld//BW.APPNODE.NAME**| |
|**//HelloWorld//BW.DEPLOYMENTUNIT.NAME**| |
|**//HelloWorld//BW.HOST.NAME**|localhost|
|**//HelloWorld//BW.DEPLOYMENTUNIT.VERSION**| |
|**//HelloWorld//BW.MODULE.VERSION**| |
|**//HelloWorld//BW.CLOUD.PORT**|8080|
|**//HelloWorld//BW.MODULE.NAME**| |
|**//HelloWorld//KUB\_MOD\_PROPERTY**|test|

## Module Properties {#Module}

|Name|Type|Public Access|Scalable|Override|
|----|----|-------------|--------|--------|
|//HelloWorld//BW.APPNODE.NAME|xsd:string|private|true|false|
|//HelloWorld//BW.DEPLOYMENTUNIT.NAME|xsd:string|private|true|false|
|//HelloWorld//BW.HOST.NAME|xsd:string|private|true|false|
|//HelloWorld//BW.DEPLOYMENTUNIT.VERSION|xsd:string|private|true|false|
|//HelloWorld//BW.MODULE.VERSION|xsd:string|private|true|false|
|//HelloWorld//BW.CLOUD.PORT|xsd:int|private|true|false|
|//HelloWorld//BW.MODULE.NAME|xsd:string|private|true|false|
|//HelloWorld//KUB\_MOD\_PROPERTY|xsd:string|public|true|false|

## Module Includes {#ModuleIncludes}

|Name|Type|Version|
|----|----|-------|
|HelloWorld|bw-appmodule|1.0.0.qualifier|

