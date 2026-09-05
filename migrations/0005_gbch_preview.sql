-- Use the supplied GBCH welcome poster as the primary work preview.
update work_items
set image = '/work/gbch-welcome-august-poster.png'
where slug = 'gbch';
