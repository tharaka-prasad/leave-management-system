<?php
namespace App\Repositories\Base;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;

class BaseRepository implements EloquentRepositoryInterface
{
    /**
     * @var Model
     */
    protected $model;

    /**
     * BaseRepository constructor.
     */
    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    public function findByLast(
        array $paramsAnddData,
        array $columns = ['*'],
        array $relations = []
    ): ?Model {
        return $this->model->select($columns)->with($relations)->where($paramsAnddData)->latest()->first();
    }

    public function findLast(
        string $column,
        array $columns = ['*'],
        array $relations = []
    ): ?Model {
        return $this->model->select($columns)->with($relations)->latest($column)->first();
    }

    // ss

    /**
     * all
     *
     * @param  mixed  $columns
     * @param  mixed  $relations
     * @param  mixed  $orderBY
     * @param  mixed  $order
     */
    public function all(array $columns = ['*'], array $relations = [], string $orderBY = 'id', string $order = 'asc'): Collection
    {
        return $this->model->with($relations)->orderBy($orderBY, $order)->get($columns);
    }

    /**
     * Method limit
     *
     * @param  int  $limit  [limit]
     * @param  array  $columns  [required columns]
     * @param  array  $relations  [required relations]
     */
    public function limit(int $limit, array $columns = ['*'], array $relations = []): Collection
    {
        return $this->model->with($relations)->limit($limit)->get($columns);
    }

    /**
     * Method paginate
     *
     * @param  int  $number  [number of records per page]
     */
    public function paginate(int $number)
    {
        return $this->model->paginate($number);
    }

    /**
     * Get all trashed models.
     */
    public function allTrashed(): Collection
    {
        return $this->model->onlyTrashed()->get();
    }

    /**
     * Find model by id.
     */
    public function findById(
        int $modelId,
        array $columns = ['*'],
        array $relations = [],
        array $appends = []
    ): ?Model {
        return $this->model->select($columns)->with($relations)->findOrFail($modelId)->append($appends);
    }

    /**
     * Find model by id.
     */
    public function findByUuId(
        string $modelUuId,
        array $columns = ['*'],
        array $relations = [],
        array $appends = []
    ): ?Model {
        return $this->model->select($columns)->with($relations)->findOrFail($modelUuId)->append($appends);
    }

    /**
     * Find model by id.
     *
     * @param  array  $modelId
     * @param  array  $appends
     */
    public function findByColumn(
        array $paramsAnddData,
        array $columns = ['*'],
        array $relations = []
    ): ?Model {
        return $this->model->select($columns)->with($relations)->where($paramsAnddData)->first();
    }

    /**
     * Find model by id.
     *
     * @param  array  $modelId
     * @param  array  $appends
     */
    public function findByColumnWithTrashed(
        array $paramsAnddData,
        array $columns = ['*'],
        array $relations = []
    ): ?Model {
        return $this->model->select($columns)->withTrashed()->with($relations)->where($paramsAnddData)->first();
    }

    /**
     * Find model by columns.
     *
     * @param  array  $modelId
     * @param  array  $appends
     */
    public function getByColumn(
        array $paramsAnddData,
        array $columns = ['*'],
        array $relations = []
    ): ?Collection {
        return $this->model->select($columns)->with($relations)->where($paramsAnddData)->get();
    }

    /**
     * Find model by columns.
     *
     * @param  array  $modelId
     * @param  array  $appends
     */
    public function getOrderbyColumn(
        array $paramsAnddData,
        string $flag,
        string $orderColumn,
        array $columns = ['*'],
        array $relations = []
    ): ?Collection {
        return $this->model->select($columns)->with($relations)->where($paramsAnddData)->orderBy($flag, $orderColumn)->get();
    }

    /**
     * Find model by columns.
     *
     * @param  array  $modelId
     * @param  array  $appends
     */
    public function getByColumnLarge(
        array $paramsAnddData,
        array $columns,
        array $relations,
        string $sortColumn,
        bool $isLatest = false
    ): ?Collection {
        $query = $this->model->select($columns)->with($relations)->where($paramsAnddData);
        if ($isLatest) {
            $query = $query->latest($sortColumn);
        } else {
            $query = $query->orderBy($sortColumn);
        }

        return $query->get();
    }

    /**
     * Find model by existsByColumn.
     *
     * @param  array  $modelId
     */
    public function existsByColumn(
        array $paramsAnddData,
        array $columns = ['*'],
        array $notNullParam = [],
    ): ?bool {
        return $this->model->select($columns)->where($paramsAnddData)->whereNotNull($notNullParam)->exists();
    }

    /**
     * Find model by existsByColumn.
     *
     * @param  array  $modelId
     */
    public function existsById(
        int $id,
    ): bool {
        return $this->model->where('id', $id)->exists();
    }

    /**
     * Find trashed model by id.
     */
    public function findTrashedById(
        int $modelId,
        array $columns = ['*'],
        array $relations = [],
        array $appends = []
    ): ?Model {
        return $this->model->select($columns)->withTrashed()->with($relations)->findOrFail($modelId)->append($appends);
    }
    // {
    //     return $this->model->withTrashed()->findOrFail($modelId);
    // }

    /**
     * Find only trashed model by id.
     */
    public function findOnlyTrashedById(int $modelId): ?Model
    {
        return $this->model->onlyTrashed()->findOrFail($modelId);
    }

    /**
     * Create a model.
     */
    public function create(array $payload): ?Model
    {
        $model = $this->model->create($payload);

        return $model->fresh();
    }

    public function findOrCreate(array $load, array $payload): ?Model
    {
        $model = $this->model->firstOrCreate($load, $payload);

        return $model->fresh();
    }

    public function createOrUpdate(array $load, array $payload): ?Model
    {
        $model = $this->model->updateOrCreate($load, $payload);

        return $model->fresh();
    }

    public function createOrUpdateWithTrashed(array $load, array $payload): ?Model
    {
        $model = $this->model->withTrashed()->updateOrCreate($load, $payload);

        return $model->fresh();
    }

    /**
     * Method createMany
     *
     * @param  array  $payloadCollection  [collection of payload]
     */
    public function createMany(array $payloadCollection): ?Collection
    {
        return $this->model->createMany($payloadCollection);
    }

    /**
     * Update existing model.
     */
    public function update(int $modelId, array $payload): bool
    {
        $model = $this->findById($modelId);

        return $model->update($payload);
    }

    /**
     * Method updateWithMeta
     *
     * @param  int  $modelId  [explicite description]
     * @param  array  $payload  [explicite description]
     */
    public function updateWithMeta(int $modelId, array $payload): bool
    {
        $model = $this->findById($modelId);
        $model->setAttributes($payload);

        return $model->save();
    }

    public function updateByColumn(array $paramsAnddData, array $payload): bool
    {
        $model = $this->findByColumn($paramsAnddData);

        return $model->update($payload);
    }

    public function updateWithTrashed(int $modelId, array $payload): bool
    {
        $model = $this->findTrashedById($modelId);

        return $model->update($payload);
    }

    /**
     * Delete model by id.
     */
    public function deleteById(int $modelId): bool
    {
        return $this->findById($modelId)->delete();
    }

    /**
     * Restore model by id.
     */
    public function restoreById(int $modelId): bool
    {
        return $this->findOnlyTrashedById($modelId)->restore();
    }

    /**
     * Permanently delete model by id.
     */
    public function permanentlyDeleteById(int $modelId): bool
    {
        return $this->findTrashedById($modelId)->forceDelete();
    }

    /**
     * @param  mixed  $filters
     * @param  array  $with
     */
    public function filter($filters, $with = []): LengthAwarePaginator
    {
        $query = $this->model->filter($filters)->orderByColumn($filters['sortBy'], $filters['sortDirection']);
        if (count($with) > 0) {
            $query = $query->with($with);
        }

        return $query->paginate($filters['rowPerPage'])->appends($filters);
    }

    /**
     * Method filterWithParam
     *
     * @param  array  $request  [Http Request]
     * @param  array  $with  [Relations]
     */
    public function filterWithParam($filters, $with = [], $param = null): LengthAwarePaginator
    {
        $query = $this->model->filter($filters)->orderByColumn($filters['sortBy'], $filters['sortDirection']);
        if (count($with) > 0) {
            $query = $query->with($with);
        }
        if ($param) {
            $query = $query->where($param);
        }

        return $query->paginate($filters['rowPerPage'])->appends($filters);
    }

    public function filterWithDateRange($filters, $with = [], $param = null): LengthAwarePaginator
    {
        $query = $this->model->dateRangeFilter($filters)->orderByColumn($filters['sortBy'], $filters['sortDirection']);
        if (count($with) > 0) {
            $query = $query->with($with);
        }
        if ($param) {
            $query = $query->where($param);
        }

        return $query->paginate($filters['rowPerPage'])->appends($filters);
    }

    /**
     * @return [type]
     */
    public function getCount(array $paramsAnddData = [])
    {
        return $this->model->where($paramsAnddData)->count();
    }

    public function updateOrCreate(array $attributes, array $values = []): Model
    {
        return $this->model->updateOrCreate($attributes, $values);
    }

    public function getById($id)
    {
        return $this->model->findOrFail($id);
    }
    public function getReplies(int $modelId): Collection
    {
                                                      // Logic to retrieve the replies for the given model
        return $this->model->find($modelId)->replies; // This is just an example, adjust as needed
    }



}
