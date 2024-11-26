'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">leek documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-cd942de2b0f52019d0f3f15f1fdc7f3550f16903d2d1cc2cd85fef482b682485adabc57bd4c658df3d56599342f6922d0977646e5b9450d2508a3ecb5efd8f29"' : 'data-bs-target="#xs-controllers-links-module-AppModule-cd942de2b0f52019d0f3f15f1fdc7f3550f16903d2d1cc2cd85fef482b682485adabc57bd4c658df3d56599342f6922d0977646e5b9450d2508a3ecb5efd8f29"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-cd942de2b0f52019d0f3f15f1fdc7f3550f16903d2d1cc2cd85fef482b682485adabc57bd4c658df3d56599342f6922d0977646e5b9450d2508a3ecb5efd8f29"' :
                                            'id="xs-controllers-links-module-AppModule-cd942de2b0f52019d0f3f15f1fdc7f3550f16903d2d1cc2cd85fef482b682485adabc57bd4c658df3d56599342f6922d0977646e5b9450d2508a3ecb5efd8f29"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-cd942de2b0f52019d0f3f15f1fdc7f3550f16903d2d1cc2cd85fef482b682485adabc57bd4c658df3d56599342f6922d0977646e5b9450d2508a3ecb5efd8f29"' : 'data-bs-target="#xs-injectables-links-module-AppModule-cd942de2b0f52019d0f3f15f1fdc7f3550f16903d2d1cc2cd85fef482b682485adabc57bd4c658df3d56599342f6922d0977646e5b9450d2508a3ecb5efd8f29"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-cd942de2b0f52019d0f3f15f1fdc7f3550f16903d2d1cc2cd85fef482b682485adabc57bd4c658df3d56599342f6922d0977646e5b9450d2508a3ecb5efd8f29"' :
                                        'id="xs-injectables-links-module-AppModule-cd942de2b0f52019d0f3f15f1fdc7f3550f16903d2d1cc2cd85fef482b682485adabc57bd4c658df3d56599342f6922d0977646e5b9450d2508a3ecb5efd8f29"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AssistantsModule.html" data-type="entity-link" >AssistantsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AssistantsModule-e31d8f2c002b05c7e8f7169ffae2110dd02a60881ee0ef5c198ac67d5cd35538809dcc0d5d60d2256840e7bc6e149ab155777c876f1c617e75e9e4017c644198"' : 'data-bs-target="#xs-controllers-links-module-AssistantsModule-e31d8f2c002b05c7e8f7169ffae2110dd02a60881ee0ef5c198ac67d5cd35538809dcc0d5d60d2256840e7bc6e149ab155777c876f1c617e75e9e4017c644198"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AssistantsModule-e31d8f2c002b05c7e8f7169ffae2110dd02a60881ee0ef5c198ac67d5cd35538809dcc0d5d60d2256840e7bc6e149ab155777c876f1c617e75e9e4017c644198"' :
                                            'id="xs-controllers-links-module-AssistantsModule-e31d8f2c002b05c7e8f7169ffae2110dd02a60881ee0ef5c198ac67d5cd35538809dcc0d5d60d2256840e7bc6e149ab155777c876f1c617e75e9e4017c644198"' }>
                                            <li class="link">
                                                <a href="controllers/AssistantController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AssistantController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AssistantsModule-e31d8f2c002b05c7e8f7169ffae2110dd02a60881ee0ef5c198ac67d5cd35538809dcc0d5d60d2256840e7bc6e149ab155777c876f1c617e75e9e4017c644198"' : 'data-bs-target="#xs-injectables-links-module-AssistantsModule-e31d8f2c002b05c7e8f7169ffae2110dd02a60881ee0ef5c198ac67d5cd35538809dcc0d5d60d2256840e7bc6e149ab155777c876f1c617e75e9e4017c644198"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AssistantsModule-e31d8f2c002b05c7e8f7169ffae2110dd02a60881ee0ef5c198ac67d5cd35538809dcc0d5d60d2256840e7bc6e149ab155777c876f1c617e75e9e4017c644198"' :
                                        'id="xs-injectables-links-module-AssistantsModule-e31d8f2c002b05c7e8f7169ffae2110dd02a60881ee0ef5c198ac67d5cd35538809dcc0d5d60d2256840e7bc6e149ab155777c876f1c617e75e9e4017c644198"' }>
                                        <li class="link">
                                            <a href="injectables/AssistantService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AssistantService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RetrievalService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RetrievalService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ConfigureModule.html" data-type="entity-link" >ConfigureModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DatasetsModule.html" data-type="entity-link" >DatasetsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-DatasetsModule-583f5cf0fd77cb2fb95b0b50952b94002223eb4b48b2a2e6f3dc9adc0e04748dcf473d9431a7efdf0ef918c60081360664f35c2d564e29d57a6239e650114d12"' : 'data-bs-target="#xs-controllers-links-module-DatasetsModule-583f5cf0fd77cb2fb95b0b50952b94002223eb4b48b2a2e6f3dc9adc0e04748dcf473d9431a7efdf0ef918c60081360664f35c2d564e29d57a6239e650114d12"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-DatasetsModule-583f5cf0fd77cb2fb95b0b50952b94002223eb4b48b2a2e6f3dc9adc0e04748dcf473d9431a7efdf0ef918c60081360664f35c2d564e29d57a6239e650114d12"' :
                                            'id="xs-controllers-links-module-DatasetsModule-583f5cf0fd77cb2fb95b0b50952b94002223eb4b48b2a2e6f3dc9adc0e04748dcf473d9431a7efdf0ef918c60081360664f35c2d564e29d57a6239e650114d12"' }>
                                            <li class="link">
                                                <a href="controllers/DatasetController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DatasetController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/DocumentController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DocumentController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/DocumentSegmentController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DocumentSegmentController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/ExampleController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExampleController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/IndexingController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IndexingController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/RetrievalController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RetrievalController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-DatasetsModule-583f5cf0fd77cb2fb95b0b50952b94002223eb4b48b2a2e6f3dc9adc0e04748dcf473d9431a7efdf0ef918c60081360664f35c2d564e29d57a6239e650114d12"' : 'data-bs-target="#xs-injectables-links-module-DatasetsModule-583f5cf0fd77cb2fb95b0b50952b94002223eb4b48b2a2e6f3dc9adc0e04748dcf473d9431a7efdf0ef918c60081360664f35c2d564e29d57a6239e650114d12"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DatasetsModule-583f5cf0fd77cb2fb95b0b50952b94002223eb4b48b2a2e6f3dc9adc0e04748dcf473d9431a7efdf0ef918c60081360664f35c2d564e29d57a6239e650114d12"' :
                                        'id="xs-injectables-links-module-DatasetsModule-583f5cf0fd77cb2fb95b0b50952b94002223eb4b48b2a2e6f3dc9adc0e04748dcf473d9431a7efdf0ef918c60081360664f35c2d564e29d57a6239e650114d12"' }>
                                        <li class="link">
                                            <a href="injectables/DatasetService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DatasetService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DocumentSegmentService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DocumentSegmentService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DocumentService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DocumentService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FilesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/IndexingService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IndexingService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JiebaKeywordService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JiebaKeywordService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LLMGeneratorService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LLMGeneratorService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ProcessDocumentService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProcessDocumentService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RetrievalService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RetrievalService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TransactionManager.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TransactionManager</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FilesModule.html" data-type="entity-link" >FilesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-FilesModule-c8f1acba3212487602407b8be893d6c81a0c329179ad6f1b502f4f317900db5a9d688ef68d737184f3872954b2aa30155f01eea4fb17fa768720e8c6a22032ee"' : 'data-bs-target="#xs-controllers-links-module-FilesModule-c8f1acba3212487602407b8be893d6c81a0c329179ad6f1b502f4f317900db5a9d688ef68d737184f3872954b2aa30155f01eea4fb17fa768720e8c6a22032ee"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-FilesModule-c8f1acba3212487602407b8be893d6c81a0c329179ad6f1b502f4f317900db5a9d688ef68d737184f3872954b2aa30155f01eea4fb17fa768720e8c6a22032ee"' :
                                            'id="xs-controllers-links-module-FilesModule-c8f1acba3212487602407b8be893d6c81a0c329179ad6f1b502f4f317900db5a9d688ef68d737184f3872954b2aa30155f01eea4fb17fa768720e8c6a22032ee"' }>
                                            <li class="link">
                                                <a href="controllers/FilesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-FilesModule-c8f1acba3212487602407b8be893d6c81a0c329179ad6f1b502f4f317900db5a9d688ef68d737184f3872954b2aa30155f01eea4fb17fa768720e8c6a22032ee"' : 'data-bs-target="#xs-injectables-links-module-FilesModule-c8f1acba3212487602407b8be893d6c81a0c329179ad6f1b502f4f317900db5a9d688ef68d737184f3872954b2aa30155f01eea4fb17fa768720e8c6a22032ee"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FilesModule-c8f1acba3212487602407b8be893d6c81a0c329179ad6f1b502f4f317900db5a9d688ef68d737184f3872954b2aa30155f01eea4fb17fa768720e8c6a22032ee"' :
                                        'id="xs-injectables-links-module-FilesModule-c8f1acba3212487602407b8be893d6c81a0c329179ad6f1b502f4f317900db5a9d688ef68d737184f3872954b2aa30155f01eea4fb17fa768720e8c6a22032ee"' }>
                                        <li class="link">
                                            <a href="injectables/FilesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PrismaModule.html" data-type="entity-link" >PrismaModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PrismaModule-975ac4420469bba6e630a9926b9e8cf41cc8171e38dbaa2383650a3b80b75c7a38b4d19dda86e757e12b97c9c996c1a5d943331fb588d8a5e697d7daf36d7891"' : 'data-bs-target="#xs-injectables-links-module-PrismaModule-975ac4420469bba6e630a9926b9e8cf41cc8171e38dbaa2383650a3b80b75c7a38b4d19dda86e757e12b97c9c996c1a5d943331fb588d8a5e697d7daf36d7891"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PrismaModule-975ac4420469bba6e630a9926b9e8cf41cc8171e38dbaa2383650a3b80b75c7a38b4d19dda86e757e12b97c9c996c1a5d943331fb588d8a5e697d7daf36d7891"' :
                                        'id="xs-injectables-links-module-PrismaModule-975ac4420469bba6e630a9926b9e8cf41cc8171e38dbaa2383650a3b80b75c7a38b4d19dda86e757e12b97c9c996c1a5d943331fb588d8a5e697d7daf36d7891"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RelationalAssistantPersistenceModule.html" data-type="entity-link" >RelationalAssistantPersistenceModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/RelationalDatasetsPersistenceModule.html" data-type="entity-link" >RelationalDatasetsPersistenceModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/RelationaLeekFilesPersistenceModule.html" data-type="entity-link" >RelationaLeekFilesPersistenceModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AllExceptionsFilter.html" data-type="entity-link" >AllExceptionsFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/AssistantMapper.html" data-type="entity-link" >AssistantMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/AssistantRepository.html" data-type="entity-link" >AssistantRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConfigureAdapter.html" data-type="entity-link" >ConfigureAdapter</a>
                            </li>
                            <li class="link">
                                <a href="classes/ContextProvider.html" data-type="entity-link" >ContextProvider</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConversationAuthorDto.html" data-type="entity-link" >ConversationAuthorDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConversationContentDto.html" data-type="entity-link" >ConversationContentDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConversationDto.html" data-type="entity-link" >ConversationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConversationMessageDto.html" data-type="entity-link" >ConversationMessageDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/COSLoader.html" data-type="entity-link" >COSLoader</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateAssistantDto.html" data-type="entity-link" >CreateAssistantDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateDatasetDto.html" data-type="entity-link" >CreateDatasetDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateDatasetProcessRuleDto.html" data-type="entity-link" >CreateDatasetProcessRuleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateDocumentByFileDto.html" data-type="entity-link" >CreateDocumentByFileDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateDocumentByTextDto.html" data-type="entity-link" >CreateDocumentByTextDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateDocumentDto.html" data-type="entity-link" >CreateDocumentDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateDocumentSegmentDto.html" data-type="entity-link" >CreateDocumentSegmentDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateEmbeddingDto.html" data-type="entity-link" >CreateEmbeddingDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/DatasetMapper.html" data-type="entity-link" >DatasetMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/DatasetProcessRuleDto.html" data-type="entity-link" >DatasetProcessRuleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/DatasetProcessRuleMapper.html" data-type="entity-link" >DatasetProcessRuleMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/DatasetProcessRuleRepository.html" data-type="entity-link" >DatasetProcessRuleRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/DatasetRepository.html" data-type="entity-link" >DatasetRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/DocumentDto.html" data-type="entity-link" >DocumentDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/DocumentMapper.html" data-type="entity-link" >DocumentMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/DocumentRepository.html" data-type="entity-link" >DocumentRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/DocumentSegmentMapper.html" data-type="entity-link" >DocumentSegmentMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/DocumentSegmentRepository.html" data-type="entity-link" >DocumentSegmentRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/EmbeddingMapper.html" data-type="entity-link" >EmbeddingMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/EmbeddingRepository.html" data-type="entity-link" >EmbeddingRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/ErrorResponseDto.html" data-type="entity-link" >ErrorResponseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/FilesMapper.html" data-type="entity-link" >FilesMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/FilesRepository.html" data-type="entity-link" >FilesRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/IndexingEstimateDto.html" data-type="entity-link" >IndexingEstimateDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/IndexingEstimateProcessRuleDto.html" data-type="entity-link" >IndexingEstimateProcessRuleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LeekAssistant.html" data-type="entity-link" >LeekAssistant</a>
                            </li>
                            <li class="link">
                                <a href="classes/LeekCSVLoader.html" data-type="entity-link" >LeekCSVLoader</a>
                            </li>
                            <li class="link">
                                <a href="classes/LeekDataset.html" data-type="entity-link" >LeekDataset</a>
                            </li>
                            <li class="link">
                                <a href="classes/LeekDatasetProcessRule.html" data-type="entity-link" >LeekDatasetProcessRule</a>
                            </li>
                            <li class="link">
                                <a href="classes/LeekDocument.html" data-type="entity-link" >LeekDocument</a>
                            </li>
                            <li class="link">
                                <a href="classes/LeekDocxLoader.html" data-type="entity-link" >LeekDocxLoader</a>
                            </li>
                            <li class="link">
                                <a href="classes/LeekEmbedding.html" data-type="entity-link" >LeekEmbedding</a>
                            </li>
                            <li class="link">
                                <a href="classes/LeekEPubLoader.html" data-type="entity-link" >LeekEPubLoader</a>
                            </li>
                            <li class="link">
                                <a href="classes/LeekExcelLoader.html" data-type="entity-link" >LeekExcelLoader</a>
                            </li>
                            <li class="link">
                                <a href="classes/LeekFile.html" data-type="entity-link" >LeekFile</a>
                            </li>
                            <li class="link">
                                <a href="classes/LeekJSONLinesLoader.html" data-type="entity-link" >LeekJSONLinesLoader</a>
                            </li>
                            <li class="link">
                                <a href="classes/LeekJSONLoader.html" data-type="entity-link" >LeekJSONLoader</a>
                            </li>
                            <li class="link">
                                <a href="classes/LeekPDFLoader.html" data-type="entity-link" >LeekPDFLoader</a>
                            </li>
                            <li class="link">
                                <a href="classes/LeekPPTXLoader.html" data-type="entity-link" >LeekPPTXLoader</a>
                            </li>
                            <li class="link">
                                <a href="classes/LeekSegment.html" data-type="entity-link" >LeekSegment</a>
                            </li>
                            <li class="link">
                                <a href="classes/LeekSRTLoader.html" data-type="entity-link" >LeekSRTLoader</a>
                            </li>
                            <li class="link">
                                <a href="classes/LeekTextLoader.html" data-type="entity-link" >LeekTextLoader</a>
                            </li>
                            <li class="link">
                                <a href="classes/LeekUnstructuredLoader.html" data-type="entity-link" >LeekUnstructuredLoader</a>
                            </li>
                            <li class="link">
                                <a href="classes/MimeTypeNames.html" data-type="entity-link" >MimeTypeNames</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginationDto.html" data-type="entity-link" >PaginationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginationResponseDto.html" data-type="entity-link" >PaginationResponseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PreProcessingRuleDto.html" data-type="entity-link" >PreProcessingRuleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProcessRuleDto.html" data-type="entity-link" >ProcessRuleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/QueryDocumentDto.html" data-type="entity-link" >QueryDocumentDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/QuerySegmentDto.html" data-type="entity-link" >QuerySegmentDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResponseIndexingEstimateDto.html" data-type="entity-link" >ResponseIndexingEstimateDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RetrievalModelDto.html" data-type="entity-link" >RetrievalModelDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SegmentationRuleDto.html" data-type="entity-link" >SegmentationRuleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SimilaritySearchDto.html" data-type="entity-link" >SimilaritySearchDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateAssistantDto.html" data-type="entity-link" >UpdateAssistantDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateDatasetDto.html" data-type="entity-link" >UpdateDatasetDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateDatasetProcessRuleDto.html" data-type="entity-link" >UpdateDatasetProcessRuleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateDocumentByFileDto.html" data-type="entity-link" >UpdateDocumentByFileDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateDocumentByTextDto.html" data-type="entity-link" >UpdateDocumentByTextDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateDocumentDto.html" data-type="entity-link" >UpdateDocumentDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateDocumentNameDto.html" data-type="entity-link" >UpdateDocumentNameDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateDocumentSegmentDto.html" data-type="entity-link" >UpdateDocumentSegmentDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UploadFileDto.html" data-type="entity-link" >UploadFileDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UploadTextFileDto.html" data-type="entity-link" >UploadTextFileDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AssistantRelationalRepository.html" data-type="entity-link" >AssistantRelationalRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ConfigureService.html" data-type="entity-link" >ConfigureService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DatasetProcessRuleRelationalRepository.html" data-type="entity-link" >DatasetProcessRuleRelationalRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DatasetRelationalRepository.html" data-type="entity-link" >DatasetRelationalRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DocumentRelationalRepository.html" data-type="entity-link" >DocumentRelationalRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DocumentSegmentRelationalRepository.html" data-type="entity-link" >DocumentSegmentRelationalRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EmbeddingRelationalRepository.html" data-type="entity-link" >EmbeddingRelationalRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ErrorsInterceptor.html" data-type="entity-link" >ErrorsInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FilesRelationalRepository.html" data-type="entity-link" >FilesRelationalRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoggingInterceptor.html" data-type="entity-link" >LoggingInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TimeoutInterceptor.html" data-type="entity-link" >TimeoutInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TransactionManager.html" data-type="entity-link" >TransactionManager</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/COSLoaderParams.html" data-type="entity-link" >COSLoaderParams</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DataSourceInfo.html" data-type="entity-link" >DataSourceInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EmbeddingWithMetadata.html" data-type="entity-link" >EmbeddingWithMetadata</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Pagination$.html" data-type="entity-link" >Pagination$</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TransactionOptions.html" data-type="entity-link" >TransactionOptions</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});