import requests
import json
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy.ext.asyncio import AsyncEngine, AsyncSession, AsyncConnection
from sqlalchemy.ext.asyncio import async_sessionmaker
from contextlib import asynccontextmanager
import asyncio
from sqlalchemy import text




MYSQL_URI = "mysql+aiomysql://root:Aa##123456@127.0.0.1:13307/testdb?charset=utf8mb4"

engine = create_async_engine(
    MYSQL_URI,
    connect_args={"auth_plugin": "caching_sha2_password", "charset": "utf8mb4"},
    echo=True,
)
async_session_local = async_sessionmaker(
    bind=engine, class_=AsyncSession, expire_on_commit=False, autocommit=False
)

@asynccontextmanager
async def get_db():
    """
    获取数据库连接
    """
    async with async_session_local() as session:
        try:
            yield session
            await session.commit()
        except:
            await session.rollback()
            raise
        finally:
            await session.close()


async def get_session() -> AsyncSession:
    async with get_engine() as engine:
        async with AsyncSession(engine) as session:
            yield session

async def method01(num:int=1):
    url=f'https://api.hellogithub.com/v1/?sort_by=featured&page={str(num)}&rank_by=newest&tid=all'
    session = requests.session()
    resp = session.get(url=url)
    json_data = resp.json()
    for item in json_data['data']:
        resp_str = json.dumps(item, indent=2, ensure_ascii=False)
        print(f'resp:{resp.status_code},resp_str:{resp_str}')

        async with get_db() as db:
            sql = text("""
                INSERT INTO github_projects (
                    item_id, full_name, title, title_en, author, author_avatar,
                    name, summary, summary_en, is_hot, is_claimed,
                    primary_lang, lang_color, clicks_total, comment_total, updated_at
                ) VALUES (
                    :item_id, :full_name, :title, :title_en, :author, :author_avatar,
                    :name, :summary, :summary_en, :is_hot, :is_claimed,
                    :primary_lang, :lang_color, :clicks_total, :comment_total, :updated_at
                )
            """)
            result = await db.execute(sql, item)
            value = result.lastrowid
            print(f"db:{db}, value:{value}")




async def main():
    try:
        for item in range(2, 100):
            await method01(item)
    finally:
        await engine.dispose()


if __name__=='__main__':
    print(f'hello')
    asyncio.run(main())
