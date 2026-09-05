-- Use the exact GB-CH welcome image supplied for the primary preview.
update work_items
set image = '/work/gbch-august-welcome.png'
where slug = 'gbch';

insert into gallery_items (work_item_id, kind, src, youtube_id, title, sort_order)
select id, 'image', '/work/gbch-august-welcome.png', null, 'GB-CH — August welcome message', 0
from work_items
where slug = 'gbch'
and not exists (select 1 from gallery_items where src = '/work/gbch-august-welcome.png');
