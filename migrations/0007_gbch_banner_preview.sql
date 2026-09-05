-- Replace the previous GBCH preview with the exact wide banner supplied in chat.
update work_items
set image = '/work/gbch-community-banner.png'
where slug = 'gbch';

delete from gallery_items
where src = '/work/gbch-august-welcome.png';

insert into gallery_items (work_item_id, kind, src, youtube_id, title, sort_order)
select id, 'image', '/work/gbch-community-banner.png', null, 'GB-CH community banner', 0
from work_items
where slug = 'gbch'
and not exists (select 1 from gallery_items where src = '/work/gbch-community-banner.png');
