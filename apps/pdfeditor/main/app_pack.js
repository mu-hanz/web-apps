require([
    'common/main/lib/controller/ScreenReaderFocus',
    'common/main/lib/component/ComboBoxDataView',
    'common/main/lib/view/AdvancedSettingsWindow',
    'common/main/lib/view/AutoCorrectDialog',
    'common/main/lib/view/DocumentAccessDialog',
    'common/main/lib/view/SaveAsDlg',
    'common/main/lib/view/CopyWarningDialog',
    'common/main/lib/view/ImageFromUrlDialog',
    'common/main/lib/view/SelectFileDlg',
    'common/main/lib/view/SymbolTableDialog',
    'common/main/lib/view/InsertTableDialog',
    'common/main/lib/view/SearchDialog',
    'common/main/lib/view/RenameDialog',
    'common/main/lib/view/PluginDlg',
    'common/main/lib/view/PluginPanel',
    'common/main/lib/view/ShapeShadowDialog',
    'common/main/lib/view/ImageFromUrlDialog',

    'pdfeditor/main/app/view/ParagraphSettingsAdvanced',
    'pdfeditor/main/app/view/ImageSettingsAdvanced',
    'pdfeditor/main/app/view/HyperlinkSettingsDialog',
    'pdfeditor/main/app/view/ShapeSettingsAdvanced',
    'pdfeditor/main/app/view/TableSettingsAdvanced',
], function () {
    Common.NotificationCenter.trigger('script:loaded');
});