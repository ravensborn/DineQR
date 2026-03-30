'use strict';

const SECTIONS = [
	// The Golden Fork
	{ id: '20000000-0000-4000-a000-000000000001', restaurant_id: '10000000-0000-4000-a000-000000000001', name: 'Starters', description: 'Begin your journey with our carefully crafted appetizers', icon: '🥗', display_order: 1, name_i18n: JSON.stringify({ en: 'Starters', ar: 'المقبلات', ckb: 'پێشخواردن' }), description_i18n: JSON.stringify({ en: 'Begin your journey with our carefully crafted appetizers', ar: 'ابدأ رحلتك مع مقبلاتنا المصنوعة بعناية', ckb: 'گەشتەکەت دەست پێ بکە لەگەڵ پێشخواردنە بەوریاییەوە دروستکراوەکانمان' }) },
	{ id: '20000000-0000-4000-a000-000000000002', restaurant_id: '10000000-0000-4000-a000-000000000001', name: 'Main Courses', description: 'Signature dishes from our head chef', icon: '🥩', display_order: 2, name_i18n: JSON.stringify({ en: 'Main Courses', ar: 'الأطباق الرئيسية', ckb: 'خواردنە سەرەکییەکان' }), description_i18n: JSON.stringify({ en: 'Signature dishes from our head chef', ar: 'أطباق مميزة من رئيس الطهاة', ckb: 'خواردنە تایبەتەکان لە سەرئاشپەز' }) },
	{ id: '20000000-0000-4000-a000-000000000003', restaurant_id: '10000000-0000-4000-a000-000000000001', name: 'Pepsi Drinks', description: 'Refreshing beverages to complement your meal', icon: '🥤', display_order: 3, name_i18n: JSON.stringify({ en: 'Pepsi Drinks', ar: 'مشروبات بيبسي', ckb: 'خواردنەوەکانی پێپسی' }), description_i18n: JSON.stringify({ en: 'Refreshing beverages to complement your meal', ar: 'مشروبات منعشة لتكمل وجبتك', ckb: 'خواردنەوەی فرێشکەر بۆ تەواوکردنی نانەکەت' }) },
	{ id: '20000000-0000-4000-a000-000000000004', restaurant_id: '10000000-0000-4000-a000-000000000001', name: 'Desserts', description: 'Sweet endings to a perfect meal', icon: '🍰', display_order: 4, name_i18n: JSON.stringify({ en: 'Desserts', ar: 'الحلويات', ckb: 'شیرینی' }), description_i18n: JSON.stringify({ en: 'Sweet endings to a perfect meal', ar: 'نهاية حلوة لوجبة مثالية', ckb: 'کۆتایی شیرین بۆ نانێکی تەواو' }) },

	// Burger Junction
	{ id: '20000000-0000-4000-a000-000000000010', restaurant_id: '10000000-0000-4000-a000-000000000002', name: 'Signature Burgers', description: 'Handcrafted patties with premium toppings', icon: '🍔', display_order: 1, name_i18n: JSON.stringify({ en: 'Signature Burgers', ar: 'البرجر المميز', ckb: 'بێرگەری تایبەت' }), description_i18n: JSON.stringify({ en: 'Handcrafted patties with premium toppings', ar: 'شرائح مصنوعة يدوياً مع إضافات ممتازة', ckb: 'پارچەی دەستکرد لەگەڵ تۆپینگی باش' }) },
	{ id: '20000000-0000-4000-a000-000000000011', restaurant_id: '10000000-0000-4000-a000-000000000002', name: 'Sides & Fries', description: 'The perfect sidekicks', icon: '🍟', display_order: 2, name_i18n: JSON.stringify({ en: 'Sides & Fries', ar: 'الإضافات والبطاطا', ckb: 'لاوازمات و فرایز' }), description_i18n: JSON.stringify({ en: 'The perfect sidekicks', ar: 'المرافقات المثالية', ckb: 'هاوڕێیانی تەواو' }) },
	{ id: '20000000-0000-4000-a000-000000000012', restaurant_id: '10000000-0000-4000-a000-000000000002', name: 'Pepsi Drinks', description: 'Ice-cold beverages', icon: '🥤', display_order: 3, name_i18n: JSON.stringify({ en: 'Pepsi Drinks', ar: 'مشروبات بيبسي', ckb: 'خواردنەوەکانی پێپسی' }), description_i18n: JSON.stringify({ en: 'Ice-cold beverages', ar: 'مشروبات مثلجة', ckb: 'خواردنەوەی ساردکراو' }) },
	{ id: '20000000-0000-4000-a000-000000000013', restaurant_id: '10000000-0000-4000-a000-000000000002', name: 'Shakes & Desserts', description: 'Thick shakes and sweet treats', icon: '🥤', display_order: 4, name_i18n: JSON.stringify({ en: 'Shakes & Desserts', ar: 'الميلك شيك والحلويات', ckb: 'شەیک و شیرینی' }), description_i18n: JSON.stringify({ en: 'Thick shakes and sweet treats', ar: 'ميلك شيك سميك وحلويات لذيذة', ckb: 'شەیکی ئەستوور و شیرینی خۆش' }) },

	// Levant Kitchen
	{ id: '20000000-0000-4000-a000-000000000020', restaurant_id: '10000000-0000-4000-a000-000000000003', name: 'Mezze', description: 'Traditional sharing plates to start', icon: '🧆', display_order: 1, name_i18n: JSON.stringify({ en: 'Mezze', ar: 'المزة', ckb: 'مەزە' }), description_i18n: JSON.stringify({ en: 'Traditional sharing plates to start', ar: 'أطباق مشاركة تقليدية للبدء', ckb: 'دەسفرەی هاوبەشی کلاسیکی بۆ دەستپێکردن' }) },
	{ id: '20000000-0000-4000-a000-000000000021', restaurant_id: '10000000-0000-4000-a000-000000000003', name: 'Grills', description: 'Charcoal-grilled meats and kebabs', icon: '🔥', display_order: 2, name_i18n: JSON.stringify({ en: 'Grills', ar: 'المشاوي', ckb: 'کەباب' }), description_i18n: JSON.stringify({ en: 'Charcoal-grilled meats and kebabs', ar: 'لحوم مشوية على الفحم وكباب', ckb: 'گۆشتی بریانکراو لەسەر خەڵووز و کەباب' }) },
	{ id: '20000000-0000-4000-a000-000000000022', restaurant_id: '10000000-0000-4000-a000-000000000003', name: 'Wraps & Sandwiches', description: 'Freshly rolled and packed with flavor', icon: '🌯', display_order: 3, name_i18n: JSON.stringify({ en: 'Wraps & Sandwiches', ar: 'اللفائف والسندويشات', ckb: 'لاوا و ساندویچ' }), description_i18n: JSON.stringify({ en: 'Freshly rolled and packed with flavor', ar: 'ملفوفة طازجة ومليئة بالنكهة', ckb: 'تازە لێوەدراو و پڕ لە تام' }) },
	{ id: '20000000-0000-4000-a000-000000000023', restaurant_id: '10000000-0000-4000-a000-000000000003', name: 'Pepsi Drinks', description: 'Cool refreshments', icon: '🥤', display_order: 4, name_i18n: JSON.stringify({ en: 'Pepsi Drinks', ar: 'مشروبات بيبسي', ckb: 'خواردنەوەکانی پێپسی' }), description_i18n: JSON.stringify({ en: 'Cool refreshments', ar: 'مرطبات منعشة', ckb: 'خواردنەوەی فرێشکەر' }) },
	{ id: '20000000-0000-4000-a000-000000000024', restaurant_id: '10000000-0000-4000-a000-000000000003', name: 'Sweets', description: 'Traditional Middle Eastern desserts', icon: '🍯', display_order: 5, name_i18n: JSON.stringify({ en: 'Sweets', ar: 'الحلويات', ckb: 'شیرینی' }), description_i18n: JSON.stringify({ en: 'Traditional Middle Eastern desserts', ar: 'حلويات شرق أوسطية تقليدية', ckb: 'شیرینی ڕەسەنی ڕۆژهەڵاتی ناوین' }) },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface) {
		for (const section of SECTIONS) {
			const existing = await queryInterface.rawSelect('menu_sections', { where: { id: section.id } }, ['id']);
			if (!existing) {
				await queryInterface.bulkInsert('menu_sections', [
					{ ...section, is_active: true, created_at: new Date(), updated_at: new Date() },
				]);
			}
		}
	},

	async down(queryInterface) {
		await queryInterface.bulkDelete('menu_sections', {
			id: SECTIONS.map((s) => s.id),
		});
	},
};
