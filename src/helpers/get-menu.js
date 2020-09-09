const getMenuItems = (role = 'USER') => {
	const menu = [
		{
			titulo: 'Dashboard',
			icon: 'mdi mdi-gauge',
			submenu: [
				{ titulo: 'Main', url: '/' },
				{ titulo: 'Gráficas', url: 'grafica1' },
				{ titulo: 'rxjs', url: 'rxjs' },
				{ titulo: 'Promesas', url: 'promesas' },
				{ titulo: 'ProgressBar', url: 'progress' }
			]
		},
		{
			titulo: 'Mantenimiento',
			icon: 'mdi mdi-folder-lock-open',
			submenu: [ { titulo: 'Hospitales', url: 'hospitals' }, { titulo: 'Doctores', url: 'doctors' } ]
		}
	];
	if (role === 'ADMIN') {
		menu[1].submenu.unshift({ titulo: 'Usuarios', url: 'users' });
	}
	//
	return menu;
};

module.exports = { getMenuItems };
