document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('file-input');
    const mainContent = document.getElementById('main-content');
    const showOptionsBtn = document.getElementById('show-options-btn');

    const tabData = [
        {
            id: 'tab-gdrive-video',
            label: 'Google Drive Video Link',
            content: `<div class='tab-step'>Paste your Google Drive video link below:<br><input class='input-box' type='text' placeholder='https://drive.google.com/...'></div>`
        },
        {
            id: 'tab-gdrive-folder',
            label: 'Google Drive Folder Link',
            content: `<div class='tab-step'>Paste your Google Drive folder link below:<br><input class='input-box' type='text' placeholder='https://drive.google.com/drive/folders/...'></div>`
        },
        {
            id: 'tab-local',
            label: 'Upload from Local',
            content: `<div class='tab-step'>
                <label for='local-file-input' class='file-label'>Select a video file from your computer:</label>
                <input class='input-box file-input' id='local-file-input' type='file' accept='video/*'>
            </div>`
        },
        {
            id: 'tab-other',
            label: 'Other Source Link',
            content: `<div class='tab-step'>Paste your video link from other sources below:<br><input class='input-box' type='text' placeholder='https://...'></div>`
        }
    ];

    showOptionsBtn.addEventListener('click', function(e) {
        e.preventDefault();
        mainContent.innerHTML = `
            <div id="dialog-box" class="dialog-box">
                <div class="tab-header">
                    ${tabData.map((tab, i) => `<button class="tab-btn${i===0?' active':''}" data-tab="${tab.id}">${tab.label}</button>`).join('')}
                </div>
                <div class="tab-content-area">
                    ${tabData[0].content}
                </div>
            </div>
        `;
        // Tab switching logic
        const tabBtns = mainContent.querySelectorAll('.tab-btn');
        const tabContentArea = mainContent.querySelector('.tab-content-area');
        tabBtns.forEach((btn, i) => {
            btn.addEventListener('click', function() {
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                tabContentArea.classList.add('fade');
                setTimeout(() => {
                    tabContentArea.innerHTML = tabData[i].content;
                    tabContentArea.classList.remove('fade');
                    // If Upload from Local tab, highlight file input and add event
                    if (tabData[i].id === 'tab-local') {
                        const localFileInput = tabContentArea.querySelector('#local-file-input');
                        const fileLabel = tabContentArea.querySelector('.file-label');
                        if (localFileInput && fileLabel) {
                            fileLabel.classList.add('highlight');
                            localFileInput.addEventListener('focus', function() {
                                fileLabel.classList.add('highlight');
                            });
                            localFileInput.addEventListener('blur', function() {
                                fileLabel.classList.remove('highlight');
                            });
                        }
                    }
                }, 200);
            });
        });
        // If default tab is local, add highlight and event
        if (tabData[0].id === 'tab-local') {
            const localFileInput = mainContent.querySelector('#local-file-input');
            const fileLabel = mainContent.querySelector('.file-label');
            if (localFileInput && fileLabel) {
                fileLabel.classList.add('highlight');
                localFileInput.addEventListener('focus', function() {
                    fileLabel.classList.add('highlight');
                });
                localFileInput.addEventListener('blur', function() {
                    fileLabel.classList.remove('highlight');
                });
            }
        }
    });
}); 
