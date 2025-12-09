const TxraPlaySound = () => {
    const c = new (window.AudioContext || window.webkitAudioContext)();
    const o = c.createOscillator();
    const g = c.createGain();
    o.connect(g); 
    g.connect(c.destination);
    o.frequency.value = 400; 
    g.gain.value = 0.02;
    o.type = 'sine'; 
    o.start();
    g.gain.exponentialRampToValueAtTime(0.00001, c.currentTime + 0.1);
    setTimeout(() => { o.stop(); c.close() }, 100);
};

const TxraPlayHoverSound = () => {
    const c = new (window.AudioContext || window.webkitAudioContext)();
    const o = c.createOscillator();
    const g = c.createGain();
    o.connect(g); 
    g.connect(c.destination);
    o.frequency.value = 600; 
    g.gain.value = 0.01;
    o.type = 'sine'; 
    o.start();
    g.gain.exponentialRampToValueAtTime(0.00001, c.currentTime + 0.05);
    setTimeout(() => { o.stop(); c.close() }, 60);
};

document.getElementById('Txra-current-date').innerText = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
});

let TxraWingsIcons = {};
let TxraState = { 
    employees: [], 
    funds: 0, 
    logs: [], 
    grades: {}, 
    nearby: [], 
    jobName: '',
    wingsConfig: [],
    jobLabel: ''
};
let TxraSelectedUser = null;
let TxraPointsType = 'add';
let TxraEditingWings = [];
let TxraAllWingsList = [];

window.addEventListener('message', (e) => {
    if (e.data.action === 'open') {
        document.body.style.display = 'flex';
        document.getElementById('Txra-main-frame').classList.add('Txra-show');
        TxraState = { ...TxraState, ...e.data };
        
        TxraAllWingsList = e.data.wingsConfig || [];
        TxraWingsIcons = e.data.configWingsIcons || {};
        
        document.getElementById('Txra-job-title').innerText = TxraState.jobLabel || 'Department';
        document.getElementById('Txra-dash-total').innerText = TxraState.employees.length;
        document.getElementById('Txra-dash-active').innerText = TxraState.employees.filter(e => e.status === 'online').length;
        document.getElementById('Txra-dash-bank').innerText = "$" + TxraState.funds.toLocaleString();
        document.getElementById('Txra-fin-balance').innerText = "$" + TxraState.funds.toLocaleString();
        TxraApp.renderAll();
    }
});

const TxraApp = {
    nav: (page, el) => {
        TxraPlaySound();
        document.querySelectorAll('.Txra-nav-item').forEach(n => n.classList.remove('Txra-active'));
        el.classList.add('Txra-active');
        document.querySelectorAll('.Txra-view-section').forEach(p => p.classList.add('Txra-hidden'));
        document.getElementById('Txra-page-' + page).classList.remove('Txra-hidden');
    },

    close: () => {
        TxraPlaySound();
        const frame = document.getElementById('Txra-main-frame');
        frame.classList.remove('Txra-show');
        frame.classList.add('Txra-closing');
        setTimeout(() => {
            document.body.style.display = 'none';
            frame.classList.remove('Txra-closing');
            fetch(`https://${GetParentResourceName()}/close`, { method: 'POST' });
        }, 550);
    },

    search: (val) => {
        const filter = val.toLowerCase();
        const rows = document.querySelectorAll('#Txra-table-employees tr');
        rows.forEach(row => {
            const text = row.innerText.toLowerCase();
            row.style.display = text.includes(filter) ? '' : 'none';
        });
    },

    renderAll: () => {
        const empTable = document.getElementById('Txra-table-employees');
        if (TxraState.employees.length > 0) {
            empTable.innerHTML = TxraState.employees.map(e => `
                <tr class="Txra-emp-row">
                    <td>${e.name}</td>
                    <td>${e.csn}</td> 
                    <td><span style="color:#fff; background:#222; padding:2px 6px; border-radius:4px; font-size:11px;">${e.grade}</span></td> 
                    <td>$${e.salary}</td>
                    <td><span class="Txra-duty-badge ${e.status === 'online' ? 'Txra-duty-yes' : 'Txra-duty-no'}">${e.status === 'online' ? 'YES' : 'NO'}</span></td>
                    <td style="text-align:right;"><button class="Txra-btn-action-gray" onclick="TxraApp.openActions('${e.csn}', '${e.name}')">MANAGE</button></td>
                </tr>
            `).join('');
        } else {
            empTable.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:20px; color:#666;">No employees found.</td></tr>';
        }

        document.getElementById('Txra-table-points').innerHTML = TxraState.employees.map(e => `
            <tr class="Txra-emp-row">
                <td>${e.name}</td> 
                <td>${e.grade}</td>
                <td><div class="Txra-points-display"><svg class="Txra-points-star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg> ${e.points}</div></td>
                <td style="text-align:right;">
                    <button class="Txra-btn-square Txra-btn-green" onclick="TxraApp.openPoints('${e.csn}', '${e.name}', 'add')">+</button>
                    <button class="Txra-btn-square Txra-btn-red" onclick="TxraApp.openPoints('${e.csn}', '${e.name}', 'remove')">-</button>
                </td>
            </tr>
        `).join('');

        document.getElementById('Txra-table-wings').innerHTML = TxraState.employees.map(e => `
            <tr class="Txra-emp-row">
                <td>${e.name}</td> 
                <td>${e.grade}</td>
                <td style="font-size:11px; color:#888; text-transform:uppercase;">${(e.wings && e.wings.length) ? e.wings.join(', ') : 'NO WINGS'}</td>
                <td style="text-align:right;"><button class="Txra-btn-action-gray" onclick="TxraApp.openWingsModal('${e.csn}', '${e.name}', '${e.grade}')">EDIT WINGS</button></td>
            </tr>
        `).join('');

        document.getElementById('Txra-table-finance-logs').innerHTML = (TxraState.logs || []).map(l => `
            <tr>
                <td>${new Date(l.created_at).toLocaleDateString()}</td> 
                <td style="color:#fff;">${l.details}</td>
                <td>${l.action_type}</td> 
                <td class="${l.action_type === 'Deposit' ? 'Txra-txt-green' : 'Txra-txt-red'}">$${l.amount}</td>
            </tr>
        `).join('');
    },

    fund: (type) => {
        const amt = document.getElementById(type === 'deposit' ? 'Txra-dep-amount' : 'Txra-wit-amount').value;
        if (!amt) return;
        fetch(`https://${GetParentResourceName()}/manageFunds`, { 
            method: 'POST', 
            body: JSON.stringify({ type, amount: amt, jobName: TxraState.jobName }) 
        });
        TxraApp.close();
    },

    openActions: (csn, name) => {
        TxraPlaySound();
        TxraSelectedUser = csn;
        document.getElementById('Txra-target-name').innerText = name;
        document.getElementById('Txra-grade-box').classList.add('Txra-hidden');
        document.getElementById('Txra-modal-actions').style.display = 'flex';
    },

    fireUser: () => {
        fetch(`https://${GetParentResourceName()}/fireEmployee`, { 
            method: 'POST', 
            body: JSON.stringify({ citizenid: TxraSelectedUser, jobName: TxraState.jobName }) 
        });
        TxraApp.closeModals();
        TxraApp.close();
    },

    showGradeSelect: () => {
        const sel = document.getElementById('Txra-grade-select');
        sel.innerHTML = '';
        for (const [lvl, g] of Object.entries(TxraState.grades)) {
            let opt = document.createElement('option'); 
            opt.value = lvl; 
            opt.innerText = g.name; 
            sel.appendChild(opt);
        }
        document.getElementById('Txra-grade-box').classList.remove('Txra-hidden');
    },

    confirmGrade: () => {
        const lvl = document.getElementById('Txra-grade-select').value;
        fetch(`https://${GetParentResourceName()}/setGrade`, { 
            method: 'POST', 
            body: JSON.stringify({ citizenid: TxraSelectedUser, grade: lvl, jobName: TxraState.jobName }) 
        });
        TxraApp.closeModals();
        TxraApp.close();
    },

    openHire: () => {
        TxraPlaySound();
        const select = document.getElementById('Txra-hire-select');
        select.innerHTML = '<option>Loading nearby people...</option>';
        document.getElementById('Txra-modal-hire').style.display = 'flex';
        fetch(`https://${GetParentResourceName()}/getNearbyPlayers`, { 
            method: 'POST', 
            body: JSON.stringify({ jobName: TxraState.jobName }) 
        })
        .then(res => res.json())
        .then(data => {
            select.innerHTML = '';
            if (data.length === 0) {
                select.innerHTML = '<option value="">No one nearby</option>';
            } else {
                data.forEach(p => {
                    let opt = document.createElement('option');
                    opt.value = p.citizenid;
                    opt.innerText = `${p.name} (ID: ${p.source})`;
                    select.appendChild(opt);
                });
            }
        });
    },

    confirmHire: () => {
        const csn = document.getElementById('Txra-hire-select').value;
        if (!csn) return;
        fetch(`https://${GetParentResourceName()}/hireEmployee`, { 
            method: 'POST', 
            body: JSON.stringify({ citizenid: csn, jobName: TxraState.jobName }) 
        });
        TxraApp.closeModals();
        setTimeout(() => TxraApp.close(), 300);
    },

    openPoints: (csn, name, type) => {
        TxraPlaySound();
        TxraSelectedUser = csn;
        TxraPointsType = type;
        document.getElementById('Txra-points-modal-title').innerText = (type === 'add' ? 'Add' : 'Remove') + ' Points';
        document.getElementById('Txra-points-target-name').innerText = name;
        document.getElementById('Txra-modal-points').style.display = 'flex';
    },

    confirmPoints: () => {
        const amt = document.getElementById('Txra-points-amount').value;
        fetch(`https://${GetParentResourceName()}/managePoints`, { 
            method: 'POST', 
            body: JSON.stringify({ citizenid: TxraSelectedUser, amount: amt, type: TxraPointsType, jobName: TxraState.jobName }) 
        });
        TxraApp.closeModals();
        TxraApp.close();
    },

    openWingsModal: (csn, name, grade) => {
        TxraPlaySound();
        TxraSelectedUser = csn;
        const user = TxraState.employees.find(e => e.csn === csn);
        TxraEditingWings = user.wings || [];
        document.getElementById('Txra-wings-target-name').innerText = name;
        TxraApp.renderWingsUI();
        document.getElementById('Txra-modal-wings-manage').style.display = 'flex';
    },

    renderWingsUI: () => {
        const cC = document.getElementById('Txra-current-wings-container');
        const aC = document.getElementById('Txra-available-wings-container');
        cC.innerHTML = ''; 
        aC.innerHTML = '';
        if (TxraEditingWings.length === 0) {
            cC.innerHTML = '<span style="color:#444; font-size:12px; width:100%; text-align:center; padding:10px;">No active wings</span>';
        }
        TxraAllWingsList.forEach(w => {
            const icon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px; height:14px;">${TxraWingsIcons[w] || ''}</svg>`;
            const el = document.createElement('div');
            if (TxraEditingWings.includes(w)) {
                el.className = 'Txra-wing-tag Txra-active';
                el.innerHTML = icon + ' ' + w + ' <span style="margin-left:5px; opacity:0.5;">✕</span>';
                el.onclick = () => TxraApp.toggleWing(w);
                cC.appendChild(el);
            } else {
                el.className = 'Txra-wing-tag';
                el.innerHTML = icon + ' ' + w;
                el.onclick = () => TxraApp.toggleWing(w);
                aC.appendChild(el);
            }
        });
    },

    toggleWing: (w) => {
        TxraPlaySound();
        if (TxraEditingWings.includes(w)) {
            TxraEditingWings = TxraEditingWings.filter(x => x !== w);
        } else {
            TxraEditingWings.push(w);
        }
        TxraApp.renderWingsUI();
    },

    saveWings: () => {
        fetch(`https://${GetParentResourceName()}/manageWings`, { 
            method: 'POST', 
            body: JSON.stringify({ citizenid: TxraSelectedUser, wings: TxraEditingWings, jobName: TxraState.jobName }) 
        });
        TxraApp.closeModals();
        TxraApp.close();
    },

    closeModals: () => {
        TxraPlaySound();
        document.querySelectorAll('.Txra-modal-overlay').forEach(m => m.style.display = 'none');
    }
};

document.onkeyup = function (data) { 
    if (data.which == 27) TxraApp.close(); 
};