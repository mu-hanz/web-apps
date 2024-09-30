import React, { useContext } from 'react';
import { Page, Navbar, NavRight, Link, ListItem, List } from 'framework7-react';
import { useTranslation } from 'react-i18next';
import { Device } from '../../../../../common/mobile/utils/device';
import { observer, inject } from "mobx-react";
import { MainContext } from '../../page/main';
import { SettingsContext } from '../../controller/settings/Settings';
import SvgIcon from '../../../../../common/mobile/lib/component/SvgIcon';
import IconSearchIos from '@common-icons/icon-search.svg';
import IconSearchAndroid from '@common-android-icons/icon-search.svg';
import IconCollaborationIos from '@common-icons/icon-collaboration.svg';
import IconCollaborationAndroid from '@common-android-icons/icon-collaboration.svg';
import IconSetupIos from '@ios-icons/icon-setup.svg';
import IconSetupAndroid from '@android-icons/icon-setup.svg';
import IconAppSettings from '@common-icons/icon-app-settings.svg';
import IconVersionHistoryIos from '@common-icons/icon-version-history.svg';
import IconVersionHistoryAndroid from '@common-android-icons/icon-version-history.svg';
import IconDownloadIos from '@common-ios-icons/icon-download.svg';
import IconDownloadAndroid from '@common-android-icons/icon-download.svg';
import IconPrint from '@common-icons/icon-print.svg';
import IconInfo from '@common-icons/icon-info.svg';
import IconHelp from '@common-icons/icon-help.svg';
import IconAbout from '@common-icons/icon-about.svg';
import IconFeedbackIos from '@common-ios-icons/icon-feedback.svg';
import IconFeedbackAndroid from '@common-android-icons/icon-feedback.svg';

const SettingsPage = inject('storeAppOptions', 'storeToolbarSettings', 'storePresentationInfo')(observer(props => {
    const { t } = useTranslation();
    const _t = t('View.Settings', {returnObjects: true});
    const {openOptions, isBranding} = useContext(MainContext);
    const settingsContext = useContext(SettingsContext);
    const appOptions = props.storeAppOptions;
    const canUseHistory = appOptions.canUseHistory;
    const storeToolbarSettings = props.storeToolbarSettings;
    const disabledPreview = storeToolbarSettings.countPages <= 0;
    const storePresentationInfo = props.storePresentationInfo;
    const docTitle = storePresentationInfo.dataDoc ? storePresentationInfo.dataDoc.title : '';
    const canCloseEditor = appOptions.canCloseEditor;
    const closeButtonText = canCloseEditor && appOptions.customization.close.text;
    const navbar =
        <Navbar>
            <div className="title" onClick={settingsContext.changeTitleHandler}>{docTitle}</div>
            {Device.phone && <NavRight><Link popupClose=".settings-popup">{_t.textDone}</Link></NavRight>}
        </Navbar>;

    const onOpenOptions = name => {
        settingsContext.closeModal();
        openOptions(name);
    }

    let _isEdit = false,
        _canDownload = false,
        _canDownloadOrigin = false,
        _canAbout = true,
        _canHelp = true,
        _canPrint = false,
        _canFeedback = true,
        _canDisplayInfo = true;

    if (appOptions.isDisconnected) {
        _isEdit = false;
        if (!appOptions.enableDownload)
            _canPrint = _canDownload = _canDownloadOrigin = false;
    } else {
        _isEdit = appOptions.isEdit;
        _canDownload = appOptions.canDownload;
        _canDownloadOrigin = appOptions.canDownloadOrigin;
        _canPrint = appOptions.canPrint;

        if (appOptions.customization && appOptions.canBrandingExt) {
            _canAbout = appOptions.customization.about !== false;
        }

        if (appOptions.customization) {
            _canHelp = appOptions.customization.help !== false;
            _canFeedback = appOptions.customization.feedback !== false;
            _canDisplayInfo = appOptions.customization.info !== false;
        }
    }
    
    return (
        <Page>
            {navbar}
            <List>
                {!props.inPopover &&
                    <ListItem disabled={appOptions.readerMode || disabledPreview ? true : false} title={!_isEdit ? _t.textFind : _t.textFindAndReplace} link="#" searchbarEnable='.searchbar' onClick={settingsContext.closeModal} className='no-indicator'>
                        {Device.ios ? 
                            <SvgIcon slot="media" symbolId={IconSearchIos.id} className={'icon icon-svg'} /> :
                            <SvgIcon slot="media" symbolId={IconSearchAndroid.id} className={'icon icon-svg'} />
                        }
                    </ListItem>
                }
                {window.matchMedia("(max-width: 374px)").matches ?
                    <ListItem title={_t.textCollaboration} link="#" onClick={() => onOpenOptions('coauth')} className='no-indicator'>
                        {Device.ios ? 
                            <SvgIcon slot="media" symbolId={IconCollaborationIos.id} className={'icon icon-svg'} /> :
                            <SvgIcon slot="media" symbolId={IconCollaborationAndroid.id} className={'icon icon-svg'} />
                        }
                    </ListItem> 
                : null}
                {_isEdit && 
                    <ListItem link="/presentation-settings/" title={_t.textPresentationSettings}>
                        {Device.ios ? 
                            <SvgIcon slot="media" symbolId={IconSetupIos.id} className={'icon icon-svg'} /> :
                            <SvgIcon slot="media" symbolId={IconSetupAndroid.id} className={'icon icon-svg'} />
                        }
                    </ListItem>
                }
                <ListItem title={_t.textApplicationSettings} link="/application-settings/">
                    <SvgIcon slot="media" symbolId={IconAppSettings.id} className={'icon icon-svg'} />
                </ListItem>
                {_isEdit && canUseHistory && 
                    <ListItem title={t('View.Settings.textVersionHistory')} link={!Device.phone ? "/version-history" : ""} onClick={() => {
                        if(Device.phone) {
                            onOpenOptions('history');
                        }
                    }}>
                        {Device.ios ? 
                            <SvgIcon slot="media" symbolId={IconVersionHistoryIos.id} className={'icon icon-svg'} /> :
                            <SvgIcon slot="media" symbolId={IconVersionHistoryAndroid.id} className={'icon icon-svg'} />
                        }
                    </ListItem>
                }
                {_canDownload &&
                    <ListItem title={_t.textDownload} link="/download/">
                        {Device.ios ? 
                            <SvgIcon slot="media" symbolId={IconDownloadIos.id} className={'icon icon-svg'} /> :
                            <SvgIcon slot="media" symbolId={IconDownloadAndroid.id} className={'icon icon-svg'} />
                        }
                    </ListItem>
                }
                {_canDownloadOrigin &&
                    <ListItem title={_t.textDownload} link="#" onClick={settingsContext.onDownloadOrigin} className='no-indicator'>
                        {Device.ios ? 
                            <SvgIcon slot="media" symbolId={IconDownloadIos.id} className={'icon icon-svg'} /> :
                            <SvgIcon slot="media" symbolId={IconDownloadAndroid.id} className={'icon icon-svg'} />
                        }
                    </ListItem>
                }
                {_canPrint &&
                    <ListItem className={disabledPreview && 'disabled'} title={_t.textPrint} onClick={settingsContext.onPrint}>
                        <SvgIcon slot="media" symbolId={IconPrint.id} className={'icon icon-svg'} />
                    </ListItem>
                }
                {!(!_canDisplayInfo && isBranding) &&
                    <ListItem title={_t.textPresentationInfo} link="/presentation-info/">
                        <SvgIcon slot="media" symbolId={IconInfo.id} className={'icon icon-svg'} />
                    </ListItem>
                }
                {_canHelp &&
                    <ListItem title={_t.textHelp} link="#" className='no-indicator' onClick={settingsContext.showHelp}>
                        <SvgIcon slot="media" symbolId={IconHelp.id} className={'icon icon-svg'} />
                    </ListItem>
                }
                {_canAbout &&
                    <ListItem title={_t.textAbout} link="/about/">
                        <SvgIcon slot="media" symbolId={IconAbout.id} className={'icon icon-svg'} />
                    </ListItem>
                }
                {_canFeedback &&
                    <ListItem title={t('View.Settings.textFeedback')} link="#" className='no-indicator' onClick={settingsContext.showFeedback}>
                        {Device.ios ? 
                            <SvgIcon slot="media" symbolId={IconFeedbackIos.id} className={'icon icon-svg'} /> :
                            <SvgIcon slot="media" symbolId={IconFeedbackAndroid.id} className={'icon icon-svg'} />
                        }
                    </ListItem>
                }
                {canCloseEditor &&
                    <ListItem title={closeButtonText ?? t('View.Settings.textClose')} link="#" className='close-editor-btn no-indicator' onClick={() => Common.Notifications.trigger('close')}></ListItem>
                }
            </List>
        </Page>
    )
}));

export default SettingsPage;